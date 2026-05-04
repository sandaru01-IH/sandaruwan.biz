import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Philosophy from "./components/Philosophy";
import Experience from "./components/Experience";
import SkillsEcosystem from "./components/SkillsEcosystem";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Journey />
      <Philosophy />
      <Experience />
      <SkillsEcosystem />
      <Capabilities />
      <Contact />
    </main>
  );
}
