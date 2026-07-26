"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { Timeline } from "@/components/sections/Timeline";
import { Traits } from "@/components/sections/Traits";
import { AnalysisDashboard } from "@/components/sections/AnalysisDashboard";
import { Notebook } from "@/components/sections/Notebook";
import { Trust } from "@/components/sections/Trust";
import { GamesHub } from "@/components/sections/GamesHub";
import { PredictionEngine } from "@/components/sections/PredictionEngine";
import { MemoryJar } from "@/components/sections/MemoryJar";
import { Letter } from "@/components/sections/Letter";
import { PhotoWall } from "@/components/sections/PhotoWall";
import { ConstellationEnding } from "@/components/sections/ConstellationEnding";
import { Footer } from "@/components/layout/Footer";
import { EasterEgg } from "@/components/effects/EasterEgg";

// Section order follows champa_project_blueprint.txt's sitemap:
// Loading -> Welcome -> Why This Exists -> Timeline -> Traits ->
// Analysis -> Notebook -> Trust -> Games -> Prediction Engine ->
// Memory Jar -> Letter -> Photo Wall -> Ending.
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div
        className={`transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <Hero />
        <WhyThisExists />
        <Timeline />
        <Traits />
        <AnalysisDashboard />
        <Notebook />
        <Trust />
        <GamesHub />
        <PredictionEngine />
        <MemoryJar />
        <Letter />
        <PhotoWall />
        <ConstellationEnding />
        <Footer />
      </div>

      <EasterEgg />
    </MotionConfig>
  );
}
