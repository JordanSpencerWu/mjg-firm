'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause, VolumeOff, Volume2 } from 'lucide-react'
import SplitType from 'split-type'
import ReactLenis, { useLenis } from '@studio-freight/react-lenis'
import ParallaxImage from '@/components/parallax-image'

gsap.registerPlugin(ScrollTrigger)

const LOCATIONS = ['London', 'Miami', 'Istanbul', 'Madrid', 'Saudi Arabia']

const IMAGES = [
  {
    url: '/images/travel-and-hospitality.avif',
    alt: 'Travel and Hospitality',
  },
  {
    url: '/images/storytelling.avif',
    alt: 'Storytelling',
  },
  {
    url: '/images/production.avif',
    alt: 'Production',
  },
  {
    url: '/images/development.avif',
    alt: 'Development',
  },
  {
    url: '/images/design.avif',
    alt: 'Design',
  },
  {
    url: '/images/campaigns.avif',
    alt: 'Campaigns',
  },
]

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPaused, setVideoPaused] = useState(true)
  const [isVideoMuted, setVideoMuted] = useState(true)
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }

    const locations = document.querySelectorAll<HTMLElement>('.stagger-li')

    locations.forEach((element) => {
      const innerText = element.innerText
      element.innerHTML = ''

      const textContainer = document.createElement('div')
      textContainer.classList.add('block')

      for (const letter of innerText) {
        const span = document.createElement('span')
        span.innerText = letter.trim() === '' ? '\xa0' : letter
        span.classList.add('letter')
        textContainer.appendChild(span)
      }

      element.appendChild(textContainer)
      element.appendChild(textContainer.cloneNode(true))
    })

    const sections = document.querySelectorAll('section')

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 100px',
        end: 'top',
        snap: {
          snapTo: 1,
          duration: 0.3,
          ease: 'power1.out',
          inertia: false,
        },
      })
    })

    const messageSection = new SplitType('#split-message-section', {
      types: 'words,chars',
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#video-section',
          start: 'center',
          end: '+=45%',
          scrub: 0.5,
        },
      })
      .set(
        messageSection.chars,
        {
          duration: 0.3,
          color: '#fff',
          stagger: 0.1,
        },
        0.1,
      )

    const listItems = document.querySelectorAll('.stagger-li')
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
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#message-section',
          start: 'center',
          toggleActions: 'play none none reverse',
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const toggleVideoPaused = () => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause()
        setVideoPaused(false)
      } else {
        videoRef.current.play()
        setVideoPaused(true)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setVideoMuted(!isVideoMuted)
    }
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <div className="animate-fade-in relative min-h-screen">
        {/* Background Video */}
        <video
          ref={videoRef}
          id="video-section"
          className="inset-0 z-0 h-screen w-full object-cover"
          poster="/images/video-first-frame.jpg"
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
        <div className="absolute inset-0 z-10 h-screen">
          <div className="flex h-full flex-col justify-center px-8 md:justify-between md:px-36 md:py-36">
            <p className="animate-fade-in-up mb-4 text-2xl md:mb-0 md:text-4xl lg:text-6xl">
              WHERE NOW IS <br /> FOREVER
            </p>
            <div className="animate-fade-in-up-delay flex flex-col items-center justify-between md:flex-row">
              <p className="text-xl md:text-xl lg:text-xl">
                Immerse in the essence of the Red Sea while embracing a{' '}
                <br className="hidden lg:block" />
                sustainable future surrounded by breathtaking beauty.
              </p>
              <div className="mt-4 flex w-full md:mt-0 md:w-fit">
                <div
                  className="mr-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white"
                  onClick={toggleVideoPaused}
                >
                  {isVideoPaused ? <Pause size={18} /> : <Play size={18} />}
                </div>
                <div
                  className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white"
                  onClick={toggleMute}
                >
                  {isVideoMuted ? (
                    <VolumeOff size={18} />
                  ) : (
                    <Volume2 size={18} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          id="message-section"
          className="gradient-animation relative leading-0"
        >
          <div className="mx-8 flex h-screen items-center justify-center md:mx-36">
            <p
              id="split-message-section"
              className="text-3xl text-white/12 md:text-5xl"
            >
              We create timeless experiences for our guests, balancing modern
              design with a focus on the present, while upholding
              hospitality&apos;s core values of generosity and compassion to
              shape lasting memories.
            </p>
          </div>
        </section>

        <section
          id="locations-section"
          className="relative flex h-screen flex-col items-center justify-center bg-[#b49e8f] text-center leading-0"
        >
          <ul className="mx-16 text-4xl font-bold text-[var(--color-primary)] uppercase md:text-8xl">
            {LOCATIONS.map((location) => (
              <li
                key={location}
                className="stagger-li mt-4 h-[40px] cursor-pointer overflow-hidden md:h-[96px]"
              >
                {location}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="locations-section"
          className="relative flex flex-col items-center justify-center py-36 leading-0"
        >
          <div className="flex max-w-4xl flex-col gap-8 md:flex-row">
            <div className="flex flex-col gap-8 text-[var(--color-primary)]">
              {IMAGES.filter((_, index) => index % 2 === 0).map(
                ({ url, alt }) => (
                  <div key={alt}>
                    <div
                      className={`block h-auto w-96 overflow-hidden rounded`}
                    >
                      <ParallaxImage src={url} alt={alt} />
                    </div>
                    <p className="my-5 text-center text-xl font-semibold uppercase">
                      {alt}
                    </p>
                  </div>
                ),
              )}
            </div>
            <div className="flex flex-col gap-8 text-[var(--color-primary)] md:mt-[170px]">
              {IMAGES.filter((_, index) => index % 2 === 1).map(
                ({ url, alt }) => (
                  <div key={alt}>
                    <div
                      className={`block h-auto w-96 overflow-hidden rounded`}
                    >
                      <ParallaxImage src={url} alt={alt} />
                    </div>
                    <p className="my-5 text-center text-xl font-semibold uppercase">
                      {alt}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  )
}
