"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './production-service-page.module.css';

export function SubserviceSectionNav({ title, sections }: { title: string; sections: { id: string; navLabel: string }[] }) {
  const [active, setActive] = useState('');
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = (nav.current?.getBoundingClientRect().bottom ?? 148) + 32;
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) current = section.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sections]);

  useEffect(() => {
    const link = nav.current?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
    const track = link?.parentElement;
    if (link && track) track.scrollTo({ left: link.offsetLeft - track.offsetLeft - (track.clientWidth - link.clientWidth) / 2, behavior: 'instant' });
  }, [active]);

  return <nav ref={nav} className={styles.nav} aria-label={`${title} sections`}><div>{sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>{section.navLabel}</a>)}</div></nav>;
}
