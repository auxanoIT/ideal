"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { AboutTeam } from "@/components/sections/about-team";
import { PartnerLogoMarquee } from "@/components/sections/partner-logo-marquee";
import {
  aboutContent as copy,
  aboutCapabilities,
  aboutPrinciples,
} from "@/data/about-content";
import styles from "./about-genea-inspired.module.css";

type Story = { title: string; paragraphs: string[] };
type Media = { image: string; alt: string };

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  // Keep server-rendered content visible, including without JavaScript.
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { opacity: [0.65, 1], y: [20, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Text({ content, hero = false }: { content: Story; hero?: boolean }) {
  return (
    <>
      {hero ? <h1>{content.title}</h1> : <h2>{content.title}</h2>}
      <div className={styles.copy}>
        <p>{content.paragraphs.join(" ")}</p>
      </div>
    </>
  );
}

function Actions() {
  return (
    <div className={styles.actions}>
      <ButtonLink href="/book-consultation">
        Discuss Your Requirements <ArrowUpRight size={18} aria-hidden />
      </ButtonLink>
      <ButtonLink href="/services" variant="secondary">
        Explore Our Capabilities <ArrowRight size={18} aria-hidden />
      </ButtonLink>
    </div>
  );
}

function Photo({
  content,
  priority = false,
}: {
  content: Media;
  priority?: boolean;
}) {
  return (
    <div className={styles.photo}>
      <Image
        src={content.image}
        alt={content.alt}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
}

function Editorial({
  content,
  reverse = false,
  warm = false,
}: {
  content: Story & Media;
  reverse?: boolean;
  warm?: boolean;
}) {
  return (
    <section className={[styles.section, warm ? styles.warm : ""].join(" ")}>
      <Container
        className={[styles.split, reverse ? styles.imageFirst : ""].join(" ")}
      >
        <Reveal className={styles.editorialText}>
          <Text content={content} />
        </Reveal>
        <Reveal className={styles.editorialPhoto}>
          <Photo content={content} />
        </Reveal>
      </Container>
    </section>
  );
}

export function AboutGeneaInspired() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={copy.hero.image}
            alt={copy.hero.alt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 65vw"
          />
        </div>
        <Container className={styles.heroInner}>
          <div className={styles.heroText}>
            <Text content={copy.hero} hero />
          </div>
        </Container>
      </section>
      {/* Former company statistics are omitted until their values are approved. */}
      <section className={styles.section}>
        <Container>
          <Reveal className={styles.center}>
            <Text content={copy.purpose} />
          </Reveal>
        </Container>
      </section>
      <Editorial content={copy.story} reverse warm />
      <PartnerLogoMarquee staticDisplay />
      <section className={styles.section}>
        <Container>
          <Reveal className={styles.center}>
            <Text content={copy.people} />
          </Reveal>
          <div className={styles.team}>
            <AboutTeam />
          </div>
        </Container>
      </section>
      <section className={styles.section}>
        <Container>
          <Reveal className={styles.center}>
            <Text content={copy.belief} />
          </Reveal>
          <div className={styles.principles}>
            {aboutPrinciples.map((item, index) => (
              <Reveal
                key={item.title}
                className={[
                  styles.principle,
                  index % 2 ? styles.reverse : "",
                ].join(" ")}
              >
                <div>
                  <h3>{item.title}</h3>
                  <div className={styles.copy}>
                    {item.paragraphs.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                </div>
                <Photo content={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <Editorial content={copy.collaboration} />
      <Editorial content={copy.quality} reverse warm />
      <section className={[styles.section, styles.dark].join(" ")}>
        <Container>
          <Reveal className={styles.center}>
            <Text content={copy.capabilities} />
          </Reveal>
          <div className={styles.capabilities}>
            {aboutCapabilities.map((item, index) => (
              <Reveal key={item.slug} className={styles.capability}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ButtonLink href={"/services/" + item.slug} variant="secondary">
                  {item.cta}
                  <ArrowUpRight size={18} aria-hidden />
                </ButtonLink>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className={[styles.section, styles.warm].join(" ")}>
        <Container className={styles.split}>
          <Reveal>
            <Text content={copy.presence} />
          </Reveal>
          <Reveal className={styles.address}>
            <address>
              21, Abeokuta Street,
              <br />
              Off Obasa Street, Oba Akran Avenue,
              <br />
              Ikeja, Lagos
            </address>
            <ButtonLink
              href="mailto:info@idealsolutions.com.ng"
              variant="secondary"
            >
              info@idealsolutions.com.ng
              <ArrowUpRight size={18} aria-hidden />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
      <section className={[styles.section, styles.dark].join(" ")}>
        <Container>
          <Reveal className={styles.center}>
            <Text content={copy.final} />
            <Actions />
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
