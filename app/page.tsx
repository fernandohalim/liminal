import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import QuoteBand from "@/components/QuoteBand";
import KineticBand from "@/components/KineticBand";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main id="top" className="relative bg-void">
      <Nav />
      <Hero />
      <Ticker />
      <QuoteBand />
      <KineticBand />
      <About />
      <Services />
      <Work />
    </main>
  );
}
