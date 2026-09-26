"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, useEffect, type KeyboardEvent } from "react";
import { ArrowRight, Check, CircleCheck, Radio, Server, ChevronDown, ChevronUp } from "lucide-react";
import { operationTeams } from "@/data/operation-teams";
import styles from "./operation-teams.module.css";

export function OperationTeams() {
  const id = useId();
  const [active, setActive] = useState(0); // Desktop tabs active index
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0); // Mobile accordion active index
  const [visited, setVisited] = useState<number[]>([0]); // Track visited tabs for deferred image loading
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!visited.includes(active)) {
      setVisited((prev) => [...prev, active]);
    }
  }, [active, visited]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % operationTeams.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + operationTeams.length) % operationTeams.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = operationTeams.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section className={styles.section} id="built-around-your-operation" aria-labelledby={`${id}-heading`}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Built around your operation</p>
          <h2 id={`${id}-heading`}>Different Teams. One Standard for Critical Infrastructure.</h2>
        </header>
        
        {/* === Desktop Layout === */}
        <div className={styles.desktopLayout}>
          <div className={styles.tabs} role="tablist" aria-label="Infrastructure support by team" aria-orientation="vertical">
            {operationTeams.map((team, index) => (
              <button key={team.id} ref={(node) => { buttons.current[index] = node; }}
                type="button" role="tab" id={`${id}-tab-${team.id}`} aria-controls={`${id}-panel-${team.id}`}
                aria-selected={active === index} tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)} onKeyDown={(event) => navigate(event, index)}>
                <span className={styles.tabNumber} aria-hidden="true">0{index + 1}</span>
                <span>{team.label}</span><ArrowRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.panels}>
            {operationTeams.map((team, index) => (
              <div key={team.id} role="tabpanel" id={`${id}-panel-${team.id}`}
                aria-labelledby={`${id}-tab-${team.id}`} hidden={index !== active} tabIndex={0}
                className={styles.panel}>
                <div className={styles.copy}>
                  <p className={styles.audience}>{team.audience}</p>
                  <h3>{team.headline}</h3>
                  <div className={styles.description}>{team.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  <ul className={styles.benefits}>
                    {team.benefits.map((benefit) => <li key={benefit}><CircleCheck size={18} aria-hidden="true" /><span>{benefit}</span></li>)}
                  </ul>
                  <Link className={styles.cta} href="/book-consultation">{team.cta}<ArrowRight size={19} aria-hidden="true" /></Link>
                </div>
                <div className={styles.visual} data-comparison={team.id === "facilities" || undefined}>
                  <div className={styles.photo}>
                    {visited.includes(index) && (
                      <Image src={`/image/operation-teams/${team.image}`} alt={team.alt} fill
                        sizes="(min-width: 1440px) 470px, (min-width: 1100px) 34vw, (min-width: 768px) 46vw, 90vw"
                        className={styles.image} priority={index === 0} />
                    )}
                    <div className={styles.photoShade} />
                  </div>
                  {team.id === "facilities" ? (
                    <div className={styles.before}><span>Before</span><small>Hard to trace</small></div>
                  ) : (
                    <div className={styles.visualLabel}><Radio size={14} aria-hidden="true" /><span>Ideal Solutions · Nigeria</span></div>
                  )}
                  <div className={styles.statusCard}>
                    <div className={styles.cardHeading}><span className={styles.cardIcon}><Server size={19} aria-hidden="true" /></span><strong>{team.cardTitle}</strong></div>
                    <div className={styles.statuses}>
                      {team.statuses.map((status, statusIndex) => (
                        <div key={status} style={{ animationDelay: `${180 + statusIndex * 90}ms` }}>
                          <span>{status}</span>{team.id === "operators" && statusIndex === 1 ? <span className={styles.workDot} /> : <Check size={15} aria-hidden="true" />}
                        </div>
                      ))}
                    </div>
                    {team.id === "remote" && <div className={styles.connection}><i /><i /><i /><i /><i /><span>Nigeria ↔ Your team</span></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Mobile Accordion Layout === */}
        <div className={styles.mobileAccordion}>
          <div className={styles.accordion} role="presentation">
            {operationTeams.map((team, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div key={team.id} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
                  <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => setActiveAccordion(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-mobile-panel-${team.id}`}
                    id={`${id}-mobile-header-${team.id}`}
                  >
                    <span className={styles.label}>{team.label}</span>
                    <span className={styles.icon}>
                      {isOpen ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
                    </span>
                  </button>
                  <div
                    id={`${id}-mobile-panel-${team.id}`}
                    className={styles.accordionPanel}
                    role="region"
                    aria-labelledby={`${id}-mobile-header-${team.id}`}
                  >
                    <div className={styles.panelInner}>
                      <div className={styles.accordionCopy}>
                        <p className={styles.audience}>{team.audience}</p>
                        <h3>{team.headline}</h3>
                        <div className={styles.description}>
                          {team.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                        <ul className={styles.benefits}>
                          {team.benefits.map((benefit) => (
                            <li key={benefit}>
                              <CircleCheck size={18} aria-hidden="true" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Link className={styles.accordionCta} href="/book-consultation">
                          {team.cta}
                          <ArrowRight size={19} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
