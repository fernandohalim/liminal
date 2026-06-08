import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";

export default function Home() {
  return (
    <main id="top" className="relative bg-void">
      <Grain />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
    </main>
  );
}
