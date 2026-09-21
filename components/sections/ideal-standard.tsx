"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  Search,
  ClipboardList,
  Settings2,
  ShieldCheck,
  Files,
  Headset,
} from "lucide-react";
import { idealStandardSteps } from "@/data/ideal-standard";
import styles from "./ideal-standard.module.css";

const icons = [Search, ClipboardList, Settings2, ShieldCheck, Files, Headset];

export function IdealStandard() {
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const active = preview ?? selected;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let visible = false;
    const sync = () => {
      section.dataset.inView = String(visible && !document.hidden);
      if (visible) section.dataset.entered = "true";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.12 });
    observer.observe(section);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  function close() {
    setPreview(null);
    setSelected(null);
  }

  return (
    <section
      ref={sectionRef}
      id="the-ideal-standard"
      className={styles.section}
      aria-labelledby={`${id}-heading`}
      onPointerLeave={() => setPreview(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>The Ideal Standard</p>
          <h2 id={`${id}-heading`}>
            Every Project. One Standard of Execution.
          </h2>
          <p className={styles.intro}>
            A disciplined delivery approach for live data centre and enterprise
            IT environments — planned, executed, verified and documented with
            control.
          </p>
        </header>
        <div
          className={styles.scene}
          data-active={active !== null || undefined}
        >
          <div className={styles.motionLayer}>
          <div className={styles.illustration}>
            <Image
              src="/image/ideal-standard/ideal-solutions-isometric-data-centre-execution-method.webp"
              alt="Isometric data centre with Nigerian engineers in blue Ideal Solutions workwear, server racks, overhead cabling, cooling and power equipment, secure entry and a monitoring workstation"
              width={1536}
              height={1024}
              sizes="(min-width: 1440px) 1036px, (min-width: 1000px) 74vw, 100vw"
            />
          </div>
          <svg
            className={styles.connectors}
            viewBox="0 0 1200 800"
            fill="none"
            aria-hidden="true"
          >
            <g className={styles.leds}>
              {[[409, 344], [482, 370], [535, 395], [594, 428], [650, 348], [738, 370]].map(([x, y], index) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" className={styles.led}
                  style={{ animationDelay: `${index * -1.3}s` }} />
              ))}
            </g>
            {idealStandardSteps.map((step, index) => (
              <g
                key={step.id}
                data-selected={active === index || undefined}
                className={styles.connector}
              >
                <ellipse
                  className={styles.area}
                  cx={step.area[0]}
                  cy={step.area[1]}
                  rx={step.area[2]}
                  ry={step.area[3]}
                />
                <path className={styles.lineBase} d={step.path} pathLength="1" style={{ animationDelay: `${index * 65}ms` }} />
                <path
                  className={styles.lineActive}
                  d={step.path}
                  pathLength="1"
                />
                <circle
                  className={styles.targetHalo}
                  cx={step.target[0]}
                  cy={step.target[1]}
                  r="10"
                  style={{ animationDelay: `${index * -.65}s` }}
                />
                <circle
                  className={styles.target}
                  cx={step.target[0]}
                  cy={step.target[1]}
                  r="4"
                />
              </g>
            ))}
          </svg>
          </div>
          <ol className={styles.steps}>
            {idealStandardSteps.map((step, index) => {
              const Icon = icons[index];
              return (
                <li
                  key={step.id}
                  className={styles.step}
                  data-step={step.id}
                  data-selected={active === index || undefined}
                >
                  <button
                    type="button"
                    aria-pressed={active === index}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setPreview(index);
                    }}
                    onFocus={() => setPreview(index)}
                    onBlur={() => setPreview(null)}
                    onClick={() => {
                      setSelected(selected === index ? null : index);
                      setPreview(null);
                    }}
                  >
                    <span className={styles.icon}>
                      <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className={styles.stepCopy}>
                      <span className={styles.stepTitle}>
                        <span className={styles.number}>0{index + 1}</span>
                        {step.title}
                      </span>
                      <span className={styles.short}>{step.short}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
