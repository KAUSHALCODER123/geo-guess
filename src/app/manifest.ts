import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlagForge",
    short_name: "FlagForge",
    description:
      "Master world geography, flags, capitals, and demographics with interactive quizzes and global daily challenges.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f19",
    theme_color: "#0b0f19",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["education", "games", "travel"],
    shortcuts: [
      {
        name: "Explore Atlas",
        url: "/explore",
        description: "Browse world atlas and country flags",
      },
      {
        name: "Play Quiz",
        url: "/play",
        description: "Test your vexillology and geography skills",
      },
      {
        name: "Daily Challenge",
        url: "/daily",
        description: "Play today's standardized daily geography challenge",
      },
      {
        name: "Compare Nations",
        url: "/compare",
        description: "Compare countries side-by-side with radar charts",
      },
    ],
  };
}
