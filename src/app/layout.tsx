import type { Metadata, Viewport } from "next";

import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/400-italic.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import "./globals.css";

import { siteConfig } from "@/config/site";

const title =
  "Maestri Advocacia — Direito do Consumidor e fraudes bancárias";
const description =
  "Advocacia dedicada a fraudes bancárias e Direito do Consumidor: golpes de Pix, cartão de crédito e compras online. Calcule seu prazo e fale com um advogado.";

export const metadata: Metadata = {
  metadataBase: siteConfig.siteUrl,
  title,
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Serviços jurídicos",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title,
    description:
      "Golpes de Pix, cartão de crédito e compras online. A lei coloca o risco da fraude sobre o banco — não sobre você.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Maestri Advocacia — Direito do Consumidor e fraudes bancárias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/assets/brand/maestri-monograma.svg", type: "image/svg+xml" },
      { url: "/assets/favicons/favicon-32.png", sizes: "32x32" },
      { url: "/assets/favicons/favicon-192.png", sizes: "192x192" },
    ],
    apple: [{ url: "/assets/favicons/favicon-180.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0b09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
