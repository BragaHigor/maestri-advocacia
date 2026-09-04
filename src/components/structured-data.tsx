import { siteConfig } from "@/config/site";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    url: siteConfig.siteUrl.toString(),
    image: new URL(
      "/assets/images/retrato-principal.jpeg",
      siteConfig.siteUrl,
    ).toString(),
    email: siteConfig.email,
    telephone: isPlaceholderPhone(siteConfig.whatsapp)
      ? undefined
      : `+${siteConfig.whatsapp}`,
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: [
      "Direito do Consumidor",
      "Fraudes bancárias",
      "Golpe do Pix",
      "Cobrança indevida",
    ],
  };
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

function isPlaceholderPhone(phone: string): boolean {
  return !/^55\d{10,11}$/.test(phone) || /^550+$/.test(phone);
}
