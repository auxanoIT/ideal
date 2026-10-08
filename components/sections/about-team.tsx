"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import { aboutTeam } from "@/data/about-team";
import styles from "./about-team.module.css";

export function AboutTeam() {
  return <div className={styles.grid}>
    {aboutTeam.map(person => <Dialog.Root key={person.name}>
      <article className={styles.card}>
        <div className={styles.portrait}>
          <Image src={person.image} alt={person.name} fill sizes="(min-width: 900px) 400px, (min-width: 640px) 44vw, 90vw" className={styles.image} />
        </div>
        <h3 className={styles.name}>{person.name}</h3>
        <p className={styles.role}>{person.role}</p>
        <Dialog.Trigger className={styles.readMore} aria-label={`Read more about ${person.name}`}>
          Read more <span className={styles.plus}><Plus size={16} aria-hidden="true" /></span>
        </Dialog.Trigger>
      </article>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog} aria-describedby={undefined}>
          <Dialog.Close className={styles.close} aria-label="Close biography"><X aria-hidden="true" /></Dialog.Close>
          <div className={styles.biography}>
            <div className={styles.bioPortrait}>
              <Image src={person.image} alt={person.name} fill sizes="(min-width: 768px) 280px, 180px" className={styles.image} />
            </div>
            <div className={styles.copy}>
              <Dialog.Title className={styles.title}>{person.name}</Dialog.Title>
              <p className={styles.bioRole}>{person.role}</p>
              {person.bio.map(paragraph => <p key={paragraph} className={styles.paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>)}
  </div>;
}
