import { CaseTypeProvider } from "@/context/case-type-context";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyContact } from "@/components/layout/sticky-contact";
import { MotionEffects } from "@/components/motion-effects";
import {
  AboutSection,
  CasesSection,
  ContactSection,
  DeadlineSection,
  FaqSection,
  GlossarySection,
  HeroSection,
  LawSection,
  ProcessSection,
  SignalsSection,
} from "@/components/sections/landing-sections";
import { StructuredData } from "@/components/structured-data";

export default function HomePage() {
  return (
    <CaseTypeProvider>
      <StructuredData />
      <a
        className="absolute top-2 -left-[9999px] z-200 rounded-sm bg-gold px-5 py-3 font-semibold text-ink focus:left-4"
        href="#main-content"
      >
        Ir para o conteúdo
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main
        className="pb-[84px] outline-none min-[1220px]:pb-0"
        id="main-content"
        tabIndex={-1}
      >
        <HeroSection />
        <DeadlineSection />
        <CasesSection />
        <SignalsSection />
        <LawSection />
        <ProcessSection />
        <GlossarySection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyContact />
      <MotionEffects />
    </CaseTypeProvider>
  );
}
