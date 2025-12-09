import type { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Target, Wrench, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-secondary/30 rounded-lg p-5 border border-border/30">
      <h5 className="font-display font-medium text-foreground mb-2">
        {project.name}
      </h5>
      
      <p className="text-sm text-muted-foreground mb-4">
        {project.description}
      </p>

      {/* Responsibilities */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Wrench className="w-4 h-4 text-primary" />
          Responsabilités
        </div>
        <ul className="space-y-1.5">
          {project.responsibilities.map((resp, idx) => (
            <li key={idx} className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary/50 before:rounded-full">
              {resp}
            </li>
          ))}
        </ul>
      </div>

      {/* Impact */}
      <div className="mb-4 p-3 bg-accent/20 rounded-md border border-primary/20">
        <div className="flex items-center gap-2 text-sm font-medium text-primary mb-1">
          <Target className="w-4 h-4" />
          Impact
        </div>
        <p className="text-sm text-foreground">
          {project.impact}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech_stack.map((tech) => (
          <Badge 
            key={tech} 
            variant="secondary" 
            className="text-xs bg-muted/50 text-muted-foreground border-border"
          >
            {tech}
          </Badge>
        ))}
      </div>

      {/* Links */}
      {project.links.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/30">
          {project.links.map((link, idx) => (
            link.url && (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {link.label}
              </a>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
