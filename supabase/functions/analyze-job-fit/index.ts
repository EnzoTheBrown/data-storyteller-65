import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const RAW_BASE = "https://raw.githubusercontent.com/EnzoTheBrown/me/main";

const fetchProfile = async () => {
  const load = async (path: string) => {
    try {
      const res = await fetch(`${RAW_BASE}/${path}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };
  const [experiences, formations] = await Promise.all([
    load("experiences/experiences.en.json"),
    load("formations/formations.en.json"),
  ]);
  return { experiences, formations };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI is not configured" }, 500);

    const body = await req.json().catch(() => ({}));
    const jobDescription = typeof body?.job_description === "string" ? body.job_description.trim() : "";
    const language = body?.language === "fr" ? "fr" : "en";
    if (jobDescription.length < 20 || jobDescription.length > 20000) {
      return json({ error: "Job description must be between 20 and 20000 characters." }, 400);
    }

    const profile = await fetchProfile();

    const systemPrompt = [
      "You evaluate how well Enzo Lebrun fits a job description.",
      "Enzo is a Lead Backend & GenAI engineer / Data Scientist based in France, specialized in NLP, MLOps, distributed systems, AWS (SageMaker), Python, and putting ML models in production.",
      "Here is his structured profile as JSON:",
      JSON.stringify(profile).slice(0, 20000),
      "Score the fit from 0 to 10 (fitting_score) and give 3 to 5 concrete reasons referencing his real experience and the job requirements.",
      `Write the reasons in ${language === "fr" ? "French" : "English"}.`,
      "Be honest: if the job is unrelated to his skills, give a low score.",
    ].join("\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Job description:\n\n${jobDescription}` },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "job_fitting",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                fitting_score: { type: "number" },
                reasons: { type: "array", items: { type: "string" } },
              },
              required: ["fitting_score", "reasons"],
            },
          },
        },
      }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error(`AI gateway error [${res.status}]: ${details}`);
      if (res.status === 429) return json({ error: "Too many requests, please retry in a moment." }, 429);
      if (res.status === 402) return json({ error: "AI credits exhausted." }, 402);
      return json({ error: "AI request failed", details }, res.status);
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content ?? "";
    let parsed: { fitting_score?: number; reasons?: string[] };
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("Unparsable AI content:", content);
      return json({ error: "Unexpected AI response" }, 502);
    }

    const score = Math.max(0, Math.min(10, Number(parsed.fitting_score ?? 0)));
    const reasons = Array.isArray(parsed.reasons)
      ? parsed.reasons.filter((r) => typeof r === "string").slice(0, 6)
      : [];

    return json({ fitting_score: Math.round(score * 10) / 10, reasons });
  } catch (error) {
    console.error("analyze-job-fit failed", error);
    return json({ error: "Unexpected server error" }, 500);
  }
});
