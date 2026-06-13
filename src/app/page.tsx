import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { ManualSection } from "@/components/home/ManualSection";
import { VideoLibrarySection } from "@/components/home/VideoLibrarySection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { AuthorSection } from "@/components/home/AuthorSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AffiliateSection } from "@/components/home/AffiliateSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ManualSection />
      <VideoLibrarySection />
      <ProgramsSection />
      <AuthorSection />
      <TestimonialsSection />
      <AffiliateSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
