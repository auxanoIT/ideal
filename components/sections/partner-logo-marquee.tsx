"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";

const partnerLogos = [
  { src: "/image/patner_logo/amcrest_logo.png.png", alt: "Amcrest" },
  {
    src: "/image/patner_logo/cambium_networks_icon.png.png",
    alt: "Cambium Networks",
  },
  { src: "/image/patner_logo/canon_anz_icon.jpeg.png", alt: "Canon" },
  {
    src: "/image/patner_logo/centurion_health_icon.png.png",
    alt: "Centurion Health",
  },
  { src: "/image/patner_logo/d-link_usa_icon.png.png", alt: "D-Link" },
  {
    src: "/image/patner_logo/dahua_technology_icon.jpeg.png",
    alt: "Dahua Technology",
  },
  {
    src: "/image/patner_logo/exceltelecominc_icon.jpeg.png",
    alt: "Excel Telecom",
  },
  { src: "/image/patner_logo/fortigate-awscom_logo.svg.png", alt: "Fortigate" },
  {
    src: "/image/patner_logo/Icon.jpeg (1).svg",
    alt: "Ideal Solutions client logo",
  },
  {
    src: "/image/patner_logo/Icon.jpeg (2).png",
    alt: "Ideal Solutions client logo",
  },
  {
    src: "/image/patner_logo/Icon.jpeg (3).png",
    alt: "Ideal Solutions client logo",
  },
  {
    src: "/image/patner_logo/Icon.jpeg (4).png",
    alt: "Ideal Solutions client logo",
  },
  {
    src: "/image/patner_logo/Icon.jpeg.png",
    alt: "Ideal Solutions client logo",
  },
  {
    src: "/image/patner_logo/Icon.png.png",
    alt: "Ideal Solutions client logo",
  },
  { src: "/image/patner_logo/kaspersky_icon.jpeg.png", alt: "Kaspersky" },
  {
    src: "/image/patner_logo/key_king_mobile_locksmith_icon.png.png",
    alt: "Key King Mobile Locksmith",
  },
  {
    src: "/image/patner_logo/matrix_professional_haircare__color_icon.png.png",
    alt: "Matrix Professional Haircare",
  },
  { src: "/image/patner_logo/mavialarm_logo.png.png", alt: "Mavi Alarm" },
  { src: "/image/patner_logo/panasonic_usa_icon.jpeg.png", alt: "Panasonic" },
  {
    src: "/image/patner_logo/sharp_healthcare_logo.png.png",
    alt: "Sharp Healthcare",
  },
  { src: "/image/patner_logo/toshiba_icon.jpeg.png", alt: "Toshiba" },
  { src: "/image/patner_logo/vmware_icon.jpeg.svg", alt: "VMware" },
];

const marqueeLogos = [...partnerLogos, ...partnerLogos];

export function PartnerLogoMarquee() {
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const syncMobileScrollState = useCallback(() => {
    const scroller = mobileScrollerRef.current;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const nextPageCount = Math.max(
      1,
      Math.ceil(scroller.scrollWidth / scroller.clientWidth),
    );
    const nextActivePage =
      maxScrollLeft > 0
        ? Math.round(
            (scroller.scrollLeft / maxScrollLeft) * (nextPageCount - 1),
          )
        : 0;

    setPageCount(nextPageCount);
    setActivePage(nextActivePage);
  }, []);

  useEffect(() => {
    const scroller = mobileScrollerRef.current;

    if (!scroller) {
      return;
    }

    syncMobileScrollState();

    const observer = new ResizeObserver(syncMobileScrollState);
    observer.observe(scroller);
    scroller.addEventListener("scroll", syncMobileScrollState, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", syncMobileScrollState);
    };
  }, [syncMobileScrollState]);

  function goToMobilePage(pageIndex: number) {
    const scroller = mobileScrollerRef.current;

    if (!scroller || pageCount <= 1) {
      return;
    }

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    scroller.scrollTo({
      left: (maxScrollLeft / (pageCount - 1)) * pageIndex,
      behavior: "smooth",
    });
  }

  return (
    <section className="overflow-hidden bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] py-10 text-white sm:py-12">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-balance text-[2rem] font-medium leading-tight tracking-[-0.035em] sm:text-[2.7rem] lg:text-[3.25rem]">
            Trusted by Clients and Partners
          </h2>
          <p className="mt-3 text-lg leading-7 text-white/82 sm:text-[1.35rem]">
            Supporting the infrastructure behind critical operations.
          </p>
        </div>
      </Container>

      <div className="partner-logo-viewport relative mt-9 hidden h-24 overflow-hidden sm:mt-11 sm:block">
        <div
          className="partner-logo-marquee flex h-full w-max items-center gap-12 px-6 sm:gap-20 sm:px-10"
          aria-label="Ideal Solutions client and partner logos"
        >
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="group mt-7 flex h-14 w-[7.5rem] shrink-0 items-center justify-center sm:w-[9rem]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={144}
                className="max-h-18 w-auto max-w-[7.5rem] object-contain grayscale transition duration-300 group-hover:grayscale-0 sm:max-h-19 sm:max-w-[15rem]"
                sizes="(min-width: 640px) 13rem, 15rem"
              />
            </div>
          ))}
        </div>
      </div>

      <Container className="mt-9 sm:hidden">
        <div>
          <div
            ref={mobileScrollerRef}
            className="scrollbar-hide flex cursor-grab snap-x snap-mandatory gap-9 overflow-x-auto scroll-smooth px-1 active:cursor-grabbing"
            aria-label="Ideal Solutions client and partner logos"
          >
            {partnerLogos.map((logo) => (
              <div
                key={logo.src}
                className="flex h-16 w-[7.5rem] shrink-0 snap-center items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="max-h-10 w-auto max-w-[10rem] object-contain opacity-70 grayscale transition duration-300"
                  sizes="10rem"
                />
              </div>
            ))}
          </div>

          {pageCount > 1 ? (
            <div className="mt-5 flex items-center justify-center gap-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show partner logo page ${index + 1}`}
                  onClick={() => goToMobilePage(index)}
                  className={`h-2 rounded-full transition ${
                    index === activePage ? "w-7 bg-white" : "w-2 bg-white/35"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
