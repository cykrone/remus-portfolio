import { Nav } from "@/components/nav";
import { EasterEggs } from "@/components/easter-eggs";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";
import { marqueeItems } from "@/lib/content";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden />
      <EasterEggs />
      <Nav />
      <main>
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
