import { CaseTypeProvider } from "@/context/case-type-context";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyContact } from "@/components/layout/sticky-contact";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  AboutSection,
  CasesSection,
  ContactSection,
  DeadlineSection,
  FaqSection,
  HeroSection,
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
      <ScrollProgress />
      <Header />
      <main className="outline-none" id="main-content" tabIndex={-1}>
        <HeroSection />
        <CasesSection />
        <SignalsSection />
        <ProcessSection />
        <AboutSection />
        <FaqSection />
        <DeadlineSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyContact />
      <WhatsappFloat />
    </CaseTypeProvider>
  );
}
