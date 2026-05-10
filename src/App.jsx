import React from "react";
import TopNav from "./components/site/TopNav";
import Hero from "./components/site/Hero";
import About from "./components/site/About";
import Pillars from "./components/site/Pillars";
import StudentWork from "./components/site/StudentWork";
import PersonalWork from "./components/site/PersonalWork";
import Stats from "./components/site/Stats";
import Process from "./components/site/Process";
import Testimonials from "./components/site/Testimonials";
import StartCTA from "./components/site/StartCTA";
import Footer from "./components/site/Footer";

export default function App() {
  return (
    <>
      <TopNav />
      <Hero />
      <About />
      <Pillars />
      <StudentWork />
      <PersonalWork />
      <Stats />
      <Process />
      <Testimonials />
      <StartCTA />
      <Footer />
    </>
  );
}
