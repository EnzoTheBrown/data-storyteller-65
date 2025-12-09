import { useState, useRef } from "react";
import { MessageCircle, X, Upload, Send, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const API_BASE = "https://46615aacc738.ngrok-free.app";

export const JobAnalyzerBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"idle" | "text" | "file">("idle");
  const [jobText, setJobText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMode("file");
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMode("file");
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const analyzeWithFile = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("document", selectedFile);
      
      const response = await fetch(`${API_BASE}/analyze-application`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }
      
      const data = await response.json();
      setResult(data.reason);
    } catch (err) {
      setError("Failed to analyze the document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeWithText = async () => {
    if (!jobText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/analyze-application-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ job_description: jobText }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }
      
      const text = await response.text();
      setResult(text);
    } catch (err) {
      setError("Failed to analyze. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setMode("idle");
    setJobText("");
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          "bg-primary text-primary-foreground hover:scale-110",
          isOpen && "rotate-90"
        )}
        aria-label="Job Analyzer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl",
          "bg-card border border-border",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-primary/10 border-b border-border p-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Is Enzo a good fit? 🎯
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drop a job description and find out!
          </p>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[380px] overflow-y-auto">
          {result ? (
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-xl p-4 text-sm text-foreground whitespace-pre-wrap">
                {result}
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

              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
                  "hover:border-primary hover:bg-primary/5",
                  selectedFile ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  className="hidden"
                />
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {selectedFile.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drop a job description file
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, TXT, or image
                    </p>
                  </>
                )}
              </div>

              {selectedFile && (
                <Button onClick={analyzeWithFile} className="w-full">
                  Analyze Document
                </Button>
              )}

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or paste text</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Text Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobText}
                  onChange={(e) => {
                    setJobText(e.target.value);
                    setMode("text");
                    setSelectedFile(null);
                  }}
                  className="min-h-[100px] resize-none bg-secondary/30"
                />
                <Button
                  onClick={analyzeWithText}
                  disabled={!jobText.trim()}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Analyze Text
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
