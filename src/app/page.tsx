import { Nav } from "@/components/nav/Nav";
import { Preloader } from "@/components/preloader/Preloader";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Intro } from "@/components/sections/Intro";
import { Industries } from "@/components/sections/Industries";
import { Work } from "@/components/sections/Work";
import { Flagship } from "@/components/sections/Flagship";
import { Frames } from "@/components/sections/Frames";
import { Factory } from "@/components/sections/Factory";
import { Capabilities } from "@/components/sections/Capabilities";
import { Experience } from "@/components/sections/Experience";
import { Approach } from "@/components/sections/Approach";
import { Credibility } from "@/components/sections/Credibility";
import { Contact } from "@/components/sections/Contact";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Walkthrough } from "@/components/walkthrough/Walkthrough";
import { marqueeSkills } from "@/content/nav";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />

        <div className="band-reveal relative border-y border-cream/10 bg-ink py-4">
          <Marquee
            items={marqueeSkills}
            duration={46}
            className="label text-[0.74rem] tracking-[0.16em] text-cream/45"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
        </div>

        <Intro />
        <Industries />
        <Work />
        <Flagship />
        <Frames />
        <Factory />
        <Capabilities />
        <Experience />
        <Approach />
        <Credibility />
        <Contact />
      </main>
      <SiteFooter />
      <Walkthrough />
    </>
  );
}
