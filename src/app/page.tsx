"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div className="relative min-h-screen animate-fade-in">
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

      {/* Video Overlay Text */}
      <div className="absolute h-screen inset-0 z-10">
        <div className="flex flex-col px-8 justify-center md:justify-between md:px-32 md:py-32 h-full">
          <p className="text-2xl mb-4 md:mb-0 md:text-4xl lg:text-6xl animate-fade-in-up">
            WHERE NOW IS <br /> FOREVER
          </p>
          <p className="text-xl md:text-xl lg:text-2xl animate-fade-in-up-delay">
            Immerse in the essence of the Red Sea while embracing a <br />
            sustainable future surrounded by breathtaking beauty.
          </p>
        </div>
      </div>

      <div className="relative leading-0 gradient-animation">
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
