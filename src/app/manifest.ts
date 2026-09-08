import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maestri Advocacia",
    short_name: "Maestri",
    description: "Direito do Consumidor e fraudes bancárias.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ea",
    theme_color: "#f7f3ea",
    lang: "pt-BR",
    icons: [
      {
        src: "/assets/favicons/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/favicons/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
