import HeroSection from "@/components/portfolio/HeroSection";
import WhatIDoSection from "@/components/portfolio/WhatIDoSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import OfferSection from "@/components/portfolio/OfferSection";
import ShowcaseSection from "@/components/portfolio/ShowcaseSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import EducationSection from "@/components/portfolio/EducationSection";
import Footer from "@/components/portfolio/Footer";
import { JobAnalyzerBot } from "@/components/portfolio/JobAnalyzerBot";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WhatIDoSection />
      <ShowcaseSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <OfferSection />
      <Footer />
      <JobAnalyzerBot />
    </main>
  );
};

export default Index;
