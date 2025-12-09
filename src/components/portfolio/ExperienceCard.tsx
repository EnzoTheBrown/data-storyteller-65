import { useState } from "react";
import type { Experience } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Building2, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "Présent";
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
};

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case "intern":
      return "bg-secondary text-secondary-foreground";
    case "junior":
      return "bg-accent/30 text-accent-foreground";
    case "mid":
      return "bg-primary/20 text-primary";
    case "lead":
      return "bg-primary text-primary-foreground";
    case "founder":
      return "gradient-accent text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="relative pl-8 pb-12 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-2 h-2 -translate-x-1/2 rounded-full bg-primary glow-primary" />

      {/* Card */}
      <div className="gradient-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 text-left hover:bg-secondary/30 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  {experience.title}
                </h3>
                <Badge className={cn("text-xs", getLevelBadgeColor(experience.level))}>
                  {experience.level}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-primary" />
                  {experience.company.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDate(experience.start_date)} — {formatDate(experience.end_date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  {experience.location}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {experience.summary}
              </p>
            </div>

            <ChevronDown 
              className={cn(
                "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                isExpanded && "rotate-180"
              )} 
            />
          </div>
        </button>

        {/* Expanded content */}
        <div className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="px-6 pb-6 border-t border-border/50">
            {/* Company description */}
            <div className="py-4 mb-4 border-b border-border/30">
              <p className="text-sm text-muted-foreground italic">
                {experience.company.description}
              </p>
              {experience.company.sectors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {experience.company.sectors.map((sector) => (
                    <Badge key={sector} variant="outline" className="text-xs border-border text-muted-foreground">
                      {sector}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Projects */}
            <h4 className="font-display text-lg font-medium text-foreground mb-4">
              Projets
            </h4>
            <div className="space-y-4">
              {experience.projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
