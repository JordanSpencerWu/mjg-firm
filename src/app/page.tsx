"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, VolumeOff, Volume2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = ["London", "Miami", "Istanbul", "Madrid", "Saudi Arabia"];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPaused, setVideoPaused] = useState(true);
  const [isVideoMuted, setVideoMuted] = useState(true);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 100px",
        end: "top",
        snap: {
          snapTo: 1,
          duration: 0.3,
          ease: "power1.out",
          inertia: false,
        },
      });
    });

    const wordSpans = document.querySelectorAll(".stagger-span");
    gsap.fromTo(
      wordSpans,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#video-section",
          start: "center",
          toggleActions: "play none none reverse",
        },
      }
    );

    const listItems = document.querySelectorAll(".stagger-li");
    gsap.fromTo(
      listItems,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#message-section",
          start: "center",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleVideoPaused = () => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause();
        setVideoPaused(false);
      } else {
        videoRef.current.play();
        setVideoPaused(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setVideoMuted(!isVideoMuted);
    }
  };

  return (
    <div className="relative min-h-screen animate-fade-in">
      {/* Background Video */}
      <video
        ref={videoRef}
        id="video-section"
        className="inset-0 w-full h-screen object-cover z-0"
        poster="/video-first-frame.jpg"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/Shebara_90s_16x9_4_K_English_Only_Music_and_Logo_4e51af11f6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay Text */}
      <div className="absolute h-screen inset-0 z-10">
        <div className="flex flex-col px-8 justify-center md:justify-between md:px-36 md:py-36 h-full">
          <p className="text-2xl mb-4 md:mb-0 md:text-4xl lg:text-6xl animate-fade-in-up">
            WHERE NOW IS <br /> FOREVER
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center animate-fade-in-up-delay">
            <p className="text-xl md:text-xl lg:text-xl">
              Immerse in the essence of the Red Sea while embracing a{" "}
              <br className="hidden lg:block" />
              sustainable future surrounded by breathtaking beauty.
            </p>
            <div className="flex w-full mt-4 md:mt-0 md:w-fit">
              <div
                className="w-14 h-14 rounded-full border border-white flex items-center justify-center cursor-pointer mr-4"
                onClick={toggleVideoPaused}
              >
                {isVideoPaused ? <Pause size={18} /> : <Play size={18} />}
              </div>
              <div
                className="w-14 h-14 rounded-full border border-white flex items-center justify-center cursor-pointer"
                onClick={toggleMute}
              >
                {isVideoMuted ? <VolumeOff size={18} /> : <Volume2 size={18} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        id="message-section"
        className="relative leading-0 gradient-animation"
      >
        <div className="flex min-h-screen justify-center items-center h-full mx-16">
          <p className="text-3xl text-white md:text-5xl">
            {[
              "We",
              "create",
              "timeless",
              "experiences",
              "for",
              "our",
              "guests,",
              "balancing",
              "modern",
              "design",
              "with",
              "a",
              "focus",
              "on",
              "the",
              "present,",
              "while",
              "upholding",
              "hospitality's",
              "core",
              "values",
              "of",
              "generosity",
              "and",
              "compassion",
              "to",
              "shape",
              "lasting",
              "memories.",
            ].map((word, index) => (
              <span key={index} className="stagger-span inline-block mr-1.5">
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section
        id="locations-section"
        className="relative leading-0 flex flex-col h-screen justify-center text-center items-center mx-16"
      >
        <ul className="text-4xl text-[var(--color-primary)] md:text-8xl font-bold uppercase">
          {LOCATIONS.map((location) => (
            <li key={location} className="stagger-li mt-4">
              {location}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
