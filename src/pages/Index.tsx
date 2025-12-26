import HeroSection from "@/components/portfolio/HeroSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ShowcaseSection from "@/components/portfolio/ShowcaseSection";
import Footer from "@/components/portfolio/Footer";
import { JobAnalyzerBot } from "@/components/portfolio/JobAnalyzerBot";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ShowcaseSection />
      <ExperienceSection />
      <EducationSection />
      <Footer />
      <JobAnalyzerBot />
    </main>
  );
};

export default Index;
