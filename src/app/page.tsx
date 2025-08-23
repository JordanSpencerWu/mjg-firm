"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const gradientSectionRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: gradientSectionRef.current,
      start: "top 100px",
      end: "bottom 100px",
      snap: {
        snapTo: 1,
        duration: 20,
        ease: "power1.out",
        inertia: false,
      },
      onEnter: () => console.log("Entered gradient section"),
      onLeave: () => console.log("Left gradient section"),
      onEnterBack: () => console.log("Entered gradient section from bottom"),
      onLeaveBack: () => console.log("Left gradient section from top"),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="inset-0 w-full h-screen object-cover z-0"
      >
        <source
          src="/Shebara_90s_16x9_4_K_English_Only_Music_and_Logo_4e51af11f6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div
        ref={gradientSectionRef}
        className="relative leading-0 gradient-animation"
      >
        <div className="flex min-h-screen justify-center items-center h-full mx-16">
          <h2 className="text-2xl text-white md:text-5xl">
            We create timeless experiences for our guests, balancing modern
            design with a focus on the present, while upholding hospitality's
            core values of generosity and compassion to shape lasting memories.{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
