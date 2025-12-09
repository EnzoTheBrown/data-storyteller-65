import { useExperiences } from "@/hooks/usePortfolioData";
import ExperienceCard from "./ExperienceCard";
import { Briefcase, Loader2 } from "lucide-react";

const ExperienceSection = () => {
  const { data: experiences, isLoading, error } = useExperiences();

  if (isLoading) {
    return (
      <section className="py-20 px-6">
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
      <section className="py-20 px-6">
        <div className="container max-w-4xl text-center text-muted-foreground">
          Impossible de charger les expériences.
        </div>
      </section>
    );
  }

  // Sort experiences by start_date descending
  const sortedExperiences = [...(experiences || [])].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container max-w-4xl">
        <div className="flex items-center gap-3 mb-12 animate-fade-in">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Expériences
            </h2>
            <p className="text-muted-foreground">Parcours professionnel</p>
          </div>
        </div>

        <div className="relative">
          {sortedExperiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
