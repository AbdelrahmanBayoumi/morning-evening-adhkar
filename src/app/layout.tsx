import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google"; // Optimized fonts
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

// Load Inter (Latin subset)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Load Amiri (Arabic subset)
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://morning-evening-adhkar.web.app"),
  title: {
    default: "أذكار الصباح والمساء - Morning & Evening Adhkar",
    template: "%s | Adhkar",
  },
  description:
    "Morning & Evening Adhkar PWA - Your daily guide for remembrance",
  applicationName: "Morning & Evening Adhkar",
  manifest: "/manifest.json",
  keywords: [
    "Adhkar",
    "Morning Adhkar",
    "Evening Adhkar",
    "Islamic",
    "Muslim",
    "Dhikr",
    "Azkar",
    "أذكار",
    "أذكار الصباح",
    "أذكار المساء",
  ],
  authors: [
    {
      name: "Abdelrahman Bayoumi",
      url: "https://abdelrahmanbayoumi.github.io/",
    },
  ],
  creator: "Abdelrahman Bayoumi",
  publisher: "Abdelrahman Bayoumi",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    title: "أذكار الصباح والمساء - Morning & Evening Adhkar",
    description:
      "Morning & Evening Adhkar PWA - Your daily guide for remembrance",
    siteName: "أذكار الصباح والمساء",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Morning & Evening Adhkar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أذكار الصباح والمساء - Morning & Evening Adhkar",
    description:
      "Morning & Evening Adhkar PWA - Your daily guide for remembrance",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/images/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/images/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/images/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/images/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/images/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/images/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/images/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/images/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Adhkar",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "أذكار الصباح والمساء",
  alternateName: "Morning & Evening Adhkar",
  url: "https://morning-evening-adhkar.web.app/",
  sameAs: "https://github.com/AbdelrahmanBayoumi/morning-evening-adhkar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={`${inter.variable} ${amiri.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
