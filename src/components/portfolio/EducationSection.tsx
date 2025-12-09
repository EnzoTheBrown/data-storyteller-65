import { useEducation } from "@/hooks/usePortfolioData";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin, Loader2 } from "lucide-react";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
};

const EducationSection = () => {
  const { data: education, isLoading, error } = useEducation();

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container max-w-4xl text-center text-muted-foreground">
          Impossible de charger les formations.
        </div>
      </section>
    );
  }

  // Sort education by end_date descending
  const sortedEducation = [...(education || [])].sort(
    (a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
  );

  return (
    <section id="education" className="py-20 px-6 bg-secondary/20">
      <div className="container max-w-4xl">
        <div className="flex items-center gap-3 mb-12 animate-fade-in">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Formation
            </h2>
            <p className="text-muted-foreground">Parcours académique</p>
          </div>
        </div>

        <div className="grid gap-6">
          {sortedEducation.map((edu, index) => (
            <div
              key={edu.id}
              className="gradient-card rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Badge className="gradient-accent text-primary-foreground">
                      {edu.degree}
                    </Badge>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {edu.field_of_study}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">
                      {edu.institution.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      {edu.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {edu.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
