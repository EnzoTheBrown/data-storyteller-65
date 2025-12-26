import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ShowcaseSection from "@/components/portfolio/ShowcaseSection";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-6 pt-8 max-w-5xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>
      </div>
      <ShowcaseSection />
    </div>
  );
};

export default Projects;
