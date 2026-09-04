import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyContact } from "@/components/layout/sticky-contact";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";
import { MotionEffects } from "@/components/motion-effects";
import {
  AttorneySection,
  CommitmentSection,
  ContactSection,
  FaqSection,
  HeroSection,
  HowItWorksSection,
  PracticeAreasSection,
} from "@/components/sections/landing-sections";
import { StructuredData } from "@/components/structured-data";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <a
        className="absolute top-2 -left-[9999px] z-200 rounded-sm bg-gold px-5 py-3 font-medium text-ink focus:left-4"
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
        <PracticeAreasSection />
        <CommitmentSection />
        <HowItWorksSection />
        <AttorneySection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyContact />
      <WhatsappFloat />
      <MotionEffects />
    </>
  );
}
