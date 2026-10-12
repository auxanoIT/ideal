"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import type { GalleryAlbum } from "@/data/work-gallery";

export function WorkGallery({ albums }: { albums: GalleryAlbum[] }) {
  const [category, setCategory] = useState("All work");
  const [selected, setSelected] = useState<GalleryAlbum | null>(null);
  const [index, setIndex] = useState(0);
  const opener = useRef<HTMLButtonElement | null>(null);
  const categories = ["All work", ...new Set(albums.map(a => a.category))];
  const visible = albums.filter(a => category === "All work" || a.category === category);
  const photo = selected?.photos[index];
  function move(direction: number) {
    if (selected) setIndex(i => (i + direction + selected.photos.length) % selected.photos.length);
  }
  return <Dialog.Root open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}>
    <div className="mb-10 flex flex-wrap gap-3" aria-label="Filter work albums">
      {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-5 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b37c00] ${category === item ? "border-[#252b33] bg-[#252b33] text-white" : "border-black/15 bg-white hover:border-[#b37c00]"}`}>{item}</button>)}
    </div>
    <p className="sr-only" role="status">{visible.length} albums shown</p>
    <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {visible.map(album => <article key={album.id} id={album.id} className="scroll-mt-32">
        <Dialog.Trigger asChild>
          <button type="button" onClick={event => { opener.current = event.currentTarget; setIndex(0); setSelected(album); }} aria-label={`Open ${album.title}, ${album.photos.length} photos`} className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#b37c00]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#e9e5dc]">
              <Image src={album.photos[0].src} alt={album.photos[0].alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-6 pb-6 pt-16 text-white">
                <span className="text-sm">{album.photos.length} photographs</span><span className="rounded-full border border-white/60 p-2"><Plus size={20} /></span>
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">{album.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{album.description}</p>
          </button>
        </Dialog.Trigger>
        <Link href={`/our-work/${album.id}`} className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#805700] underline decoration-[#f2a900] decoration-2 underline-offset-4">View all {album.photos.length} photos <ArrowRight size={17} className="ml-2" aria-hidden="true" /></Link>
      </article>)}
    </div>
    {!albums.length && <p className="py-12">More moments from our work will be shared here soon.</p>}
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90" />
      <Dialog.Content onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }} onKeyDown={e => { if (e.key === "ArrowRight") { e.preventDefault(); move(1); } if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); } }} className="fixed inset-0 z-[101] flex flex-col bg-[#171b20] p-4 text-white outline-none sm:p-7">
        <div className="flex items-start justify-between gap-5 pb-4">
          <div><Dialog.Title className="text-lg font-semibold sm:text-2xl">{selected?.title}</Dialog.Title><Dialog.Description className="mt-1 text-sm text-white/65">{selected?.category}</Dialog.Description></div>
          <Dialog.Close aria-label="Close gallery" className="rounded-full border border-white/30 p-3 hover:bg-white/15 focus-visible:outline-2"><X size={22} /></Dialog.Close>
        </div>
        {photo && <div className="relative min-h-0 flex-1"><Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" /></div>}
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 pt-5">
          <button aria-label="Previous photo" onClick={() => move(-1)} className="shrink-0 rounded-full border border-white/30 p-3 hover:bg-white/15"><ArrowLeft size={22} /></button>
          <div aria-live="polite" aria-atomic="true" className="text-center"><p className="text-xs text-white/60">{index + 1} / {selected?.photos.length}</p><p className="mt-1 text-xs leading-5 sm:text-sm">{photo?.alt}</p></div>
          <button aria-label="Next photo" onClick={() => move(1)} className="shrink-0 rounded-full border border-white/30 p-3 hover:bg-white/15"><ArrowRight size={22} /></button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
