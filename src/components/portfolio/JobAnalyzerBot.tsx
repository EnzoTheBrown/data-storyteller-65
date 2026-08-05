import { useState } from "react";
import { MessageCircle, X, Send, Loader2, Star, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { FunctionsHttpError } from "@supabase/supabase-js";

interface AnalysisResult {
  fitting_score: number;
  reasons: string[];
}

export const JobAnalyzerBot = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [jobText, setJobText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyToShare = async () => {
    if (!result) return;
    
    const shareText = `🎯 Enzo Lebrun - Job Fit Analysis

⭐ Fitting Score: ${result.fitting_score}/10

Why Enzo fits:
${result.reasons.map(r => `• ${r}`).join('\n')}

Check out his portfolio: https://enzolebrun.dev`;

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Share it on Teams, LinkedIn, X, or anywhere!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const analyzeWithText = async () => {
    if (!jobText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke<AnalysisResult>(
        "analyze-job-fit",
        { body: { job_description: jobText, language } },
      );

      if (fnError) {
        const details =
          fnError instanceof FunctionsHttpError
            ? await fnError.context.text()
            : fnError.message;
        console.error("analyze-job-fit failed:", details);
        let message = "Failed to analyze. Please try again.";
        try {
          const parsed = JSON.parse(details);
          if (parsed?.error) message = parsed.error;
        } catch {
          /* keep default message */
        }
        setError(message);
        return;
      }

      if (!data?.reasons?.length) {
        setError("Failed to analyze. Please try again.");
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Failed to analyze. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setJobText("");
    setResult(null);
    setError(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      {/* Floating Button with Teaser */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* Teaser bubble */}
        <div
          className={cn(
            "bg-card border border-border rounded-2xl rounded-br-sm px-4 py-3 shadow-lg transition-all duration-300 max-w-[200px]",
            isOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 animate-fade-in"
          )}
        >
          <p className="text-sm font-medium text-foreground">
            Hiring? Check if I'm a fit! 🎯
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Paste a job description
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
            "bg-primary text-primary-foreground hover:scale-110",
            isOpen && "rotate-90"
          )}
          aria-label="Job Analyzer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[420px] max-h-[600px] rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl",
          "bg-card border border-border",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-primary/10 border-b border-border p-5">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Is Enzo a good fit? 🎯
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Paste a job description and find out instantly!
          </p>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[480px] overflow-y-auto">
          {result ? (
            <div className="space-y-4">
              {/* Score Display */}
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className={cn("w-6 h-6", getScoreColor(result.fitting_score))} />
                  <span className={cn("text-3xl font-bold", getScoreColor(result.fitting_score))}>
                    {result.fitting_score}/10
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Fitting Score</p>
              </div>

              {/* Reasons */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Why Enzo fits:</h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <li
                      key={index}
                      className="bg-secondary/30 rounded-lg p-3 text-sm text-foreground flex gap-2"
                    >
                      <span className="text-primary font-bold">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share Section */}
              <div className="bg-primary/10 rounded-xl p-4 space-y-3">
                <p className="text-sm text-foreground font-medium text-center">
                  Share this result! 🚀
                </p>
                <Button onClick={copyToShare} variant="secondary" className="w-full">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to share on Teams, LinkedIn, X...
                    </>
                  )}
                </Button>
              </div>

              <Button onClick={reset} variant="outline" className="w-full">
                Analyze another job
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Analyzing job fit...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Text Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                  className="min-h-[200px] resize-none bg-secondary/30"
                />
                <Button
                  onClick={analyzeWithText}
                  disabled={!jobText.trim()}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
