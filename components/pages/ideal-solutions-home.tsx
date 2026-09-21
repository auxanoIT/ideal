"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";

const VIDEO_URL =
  "https://res.cloudinary.com/dnqn2cs4e/video/upload/v1789049422/idealsolution_krfs3x.mp4";

// The rest of the original homepage is rendered separately in app/page.tsx.
export function IdealSolutionsHome() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion || paused) video.pause();
    else void video.play().catch(() => undefined);
  }, [reduceMotion, paused]);

  return (
    <div className="ideal-home-opening">
      <section className="ideal-video-hero" aria-labelledby="ideal-hero-title">
        <video
          ref={videoRef}
          className="ideal-video-hero__video"
          src={VIDEO_URL}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/dnqn2cs4e/video/upload/so_0/idealsolution_krfs3x.jpg"
          preload="metadata"
          aria-hidden="true"
        />
        <div className="ideal-video-hero__shade" aria-hidden="true" />
        <Container className="ideal-video-hero__container">
          <motion.div
            className="ideal-video-hero__content"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ideal-video-hero__copy">
              <svg
                className="ideal-video-hero__frame"
                viewBox="0 0 800 430"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="ideal-frame-left"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#F2A900" />
                    <stop offset="48%" stopColor="#FAF7F0" />
                    <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="ideal-frame-right"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FAF7F0" stopOpacity="0" />
                    <stop offset="48%" stopColor="#FAF7F0" />
                    <stop offset="85%" stopColor="#F2A900" />
                    <stop offset="100%" stopColor="#F2A900" />
                  </linearGradient>
                </defs>
                <path
                  d="M205 12 H65 L-49 408"
                  fill="none"
                  stroke="url(#ideal-frame-left)"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M686 30 L550 456 H310"
                  fill="none"
                  stroke="url(#ideal-frame-right)"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <h1 id="ideal-hero-title">
                Your Data Centre Infrastructure Partner on the Ground in Nigeria
              </h1>
            </div>
            <Link href="/book-consultation" className="ideal-video-hero__cta">
              Discuss Your Requirements{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>
        </Container>
        {!reduceMotion && (
          <button
            type="button"
            className="ideal-video-hero__playback"
            onClick={() => setPaused((value) => !value)}
            aria-label={
              paused ? "Play background video" : "Pause background video"
            }
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        )}
      </section>
      <section className="ideal-hero-intro" aria-labelledby="ideal-intro-title">
        <div className="ideal-hero-intro__image">
          <Image
            src="/image/ideal-solutions-data-centre-infrastructure-support.png"
            alt="Technician inspecting organised racks and cabling in a data centre"
            fill
            sizes="(min-width: 768px) 65vw, 100vw"
            className="object-cover"
          />
        </div>
        <Container className="relative">
          <motion.div
            className="ideal-hero-intro__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
          >
            <p className="ideal-hero-intro__eyebrow">What We Bring Onsite</p>
            <h2 id="ideal-intro-title">
              The Technical Execution Behind Reliable Data Centres
            </h2>
            <p className="ideal-hero-intro__description">
              From rack-and-stack and structured cabling to Smart Hands,
              infrastructure audits and ongoing technical support, Ideal
              Solutions provides experienced local teams to help data centre
              operators, international technology companies, system integrators
              and enterprise IT organisations deploy, maintain and improve
              mission-critical infrastructure across Nigeria.
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
