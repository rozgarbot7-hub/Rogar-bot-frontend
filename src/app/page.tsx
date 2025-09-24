import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import RozgarFeatures from "@/components/RozgarFeatures";
import RozgarSteps from "@/components/RozgarSteps";
import ContactPage from "./contact/page";
import AboutSection from "@/components/AboutSection";
import RozgarVideo from "@/components/RozgarVideo";


export default function HomePage() {
  return (
    <main>
      <Hero />
      <RozgarFeatures />
      <RozgarSteps />
      <AboutSection />
      <RozgarVideo />
      <FaqSection />
      <ContactPage />
    </main>
  );
}
