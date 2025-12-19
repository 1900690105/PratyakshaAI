import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* -------------------------------
   Fonts (Optimized & Variable)
-------------------------------- */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/* -------------------------------
   SEO Metadata (Global)
-------------------------------- */
export const metadata = {
  metadataBase: new URL("https://pratyakshaai.vercel.app/"),

  title: {
    default: "Food Scanner & Health Analyzer",
    template: "%s | Food Scanner",
  },

  description:
    "Scan food barcodes and ingredients to analyze nutrition, sugar intake, allergens, and personalized health insights.",

  applicationName: "Food Scanner",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    "food scanner",
    "barcode scanner",
    "nutrition analysis",
    "sugar tracker",
    "health food app",
    "ingredient analysis",
  ],

  authors: [
    { name: "Your Company Name", url: "https://pratyakshaai.vercel.app/" },
  ],
  creator: "Your Company Name",
  publisher: "Your Company Name",

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

  /* -------- Open Graph -------- */
  openGraph: {
    title: "Food Scanner & Health Analyzer",
    description:
      "Instantly scan food and get nutrition, sugar, and health insights tailored to you.",
    url: "https://pratyakshaai.vercel.app/",
    siteName: "Food Scanner",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Food Scanner App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  /* -------- Twitter -------- */
  twitter: {
    card: "summary_large_image",
    title: "Food Scanner & Health Analyzer",
    description:
      "Scan food barcodes to understand nutrition, sugar, and health impact.",
    images: ["/og-image.png"],
    creator: "@yourhandle",
  },

  /* -------- Icons -------- */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

/* -------------------------------
   Root Layout
-------------------------------- */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
