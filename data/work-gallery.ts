export const galleryCategories = ["Data Centre Work", "Security & Access", "Onsite Installations"] as const;
export type GalleryPhoto = { src: string; alt: string; width: number; height: number };
export type GalleryAlbum = { id: string; title: string; category: string; description: string; photos: GalleryPhoto[] };

const photo = (name: string, alt: string): GalleryPhoto => ({ src: `/image/our-work/${name}.webp`, alt, width: 750, height: 1000 });

export const starterGallery: GalleryAlbum[] = [
  {
    id: "data-centre-work", title: "Inside the data centre", category: "Data Centre Work",
    description: "A closer look at our team working around rack enclosures, overhead containment and raised-floor infrastructure.",
    photos: [
      photo("overhead-containment", "Technician working on overhead containment between data centre enclosures"),
      photo("raised-floor-inspection", "Technician accessing infrastructure beneath a raised floor"),
      photo("raised-floor-work", "Team member lifting floor panels beside data centre enclosures"),
    ],
  },
  {
    id: "rack-deployment", title: "Rack deployment, front to rear", category: "Data Centre Work",
    description: "Front and rear views of populated data centre racks, showing mounted equipment, network connections and cable routing.",
    photos: [
      photo("ideal-solutions-data-centre-rack-r07-07-front", "Front of data centre rack R07-07 with mounted servers and connected equipment"),
      photo("ideal-solutions-data-centre-rack-r07-08-front", "Front of data centre rack R07-08 with mounted servers and network connections"),
      photo("ideal-solutions-data-centre-rack-r07-09-front", "Front of data centre rack R07-09 with stacked server equipment"),
      photo("ideal-solutions-data-centre-rack-r07-10-front", "Front of data centre rack R07-10 with stacked server equipment"),
      photo("ideal-solutions-data-centre-rack-r07-11-front", "Front of data centre rack R07-11 with mounted servers and connected equipment"),
      photo("ideal-solutions-data-centre-rack-r08-07-front", "Front of data centre rack R08-07 with server hardware and network connections"),
      photo("ideal-solutions-data-centre-rack-r08-08-front", "Front of data centre rack R08-08 with rack-mounted equipment and connected cables"),
      photo("ideal-solutions-data-centre-rack-r08-09-front", "Front of data centre rack R08-09 with rack-mounted equipment and connected cables"),
      photo("ideal-solutions-data-centre-rack-r08-10-front", "Front of data centre rack R08-10 with mounted equipment and connected cables"),
      photo("ideal-solutions-data-centre-rack-r08-11-front", "Front of data centre rack R08-11 with mounted equipment and staged cable coils"),
      photo("ideal-solutions-data-centre-rack-r08-08-rear", "Rear of data centre rack R08-08 with network devices and cable routing"),
      photo("ideal-solutions-data-centre-rack-r08-09-rear", "Upper rear view of data centre rack R08-09 showing network equipment"),
      photo("ideal-solutions-data-centre-rack-r08-09-rear-full", "Full rear view of data centre rack R08-09 with switches and connections"),
      photo("ideal-solutions-data-centre-rack-r08-10-rear", "Upper rear view of data centre rack R08-10 showing network equipment"),
      photo("ideal-solutions-data-centre-rack-r08-10-rear-full", "Full rear view of data centre rack R08-10 with network switches and routed cables"),
      photo("ideal-solutions-data-centre-rack-r08-11-rear", "Upper rear view of data centre rack R08-11 showing network equipment"),
      photo("ideal-solutions-data-centre-rack-r08-11-rear-full", "Full rear view of data centre rack R08-11 with network equipment and staged cables"),
      photo("ideal-solutions-data-centre-rack-row-rear", "Rear view of a data centre rack with network switches and cable connections"),
    ],
  },
  {
    id: "security-access", title: "At the perimeter", category: "Security & Access",
    description: "Hands-on inspection and servicing of gate mechanisms and access equipment.",
    photos: [
      photo("gate-inspection", "Team member inspecting a gate actuator at the site perimeter"),
      photo("gate-track", "Technician inspecting the lower track of a perimeter gate"),
      photo("gate-actuator", "Technician checking the gate actuator mechanism"),
      photo("gate-motor", "Technician working on an open gate motor enclosure"),
      photo("gate-team", "Team members inspecting gate control equipment together"),
      photo("gate-controls", "Close view of the team working on gate control wiring"),
    ],
  },
  {
    id: "onsite-installations", title: "The details behind delivery", category: "Onsite Installations",
    description: "Our team at work on wall-mounted equipment, cable routes and onsite installation tasks.",
    photos: [
      photo("indoor-installation", "Technician installing wall-mounted equipment from a ladder"),
      photo("exterior-installation", "Technician on a ladder working on exterior wall equipment"),
      photo("exterior-cabling", "Installer securing an exterior cable route beneath an awning"),
      photo("installation-team", "Team supporting exterior wall installation work"),
      photo("wall-cable-route", "Technicians working together on wall-mounted cable routing"),
      photo("enclosure-wiring", "Technician connecting wiring inside a wall-mounted enclosure"),
      photo("enclosure-cover", "Technician preparing the cover for a wall-mounted enclosure"),
      photo("overhead-cable-route", "Installer working beside overhead cable trays"),
      photo("wall-equipment", "Technician fitting wall equipment beneath overhead containment"),
    ],
  },
];
