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
    default: "PratyakshaAI:Food Scanner & Health Analyzer",
    template: "%s | PratyakshaAI",
  },

  description:
    "Scan food barcodes and ingredients to analyze nutrition, sugar intake, allergens, and personalized health insights.",

  applicationName: "PratyakshaAI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    "PratyakshaAI",
    "food scanner",
    "barcode scanner",
    "nutrition analysis",
    "sugar tracker",
    "health food app",
    "ingredient analysis",
  ],

  authors: [{ name: "PratyakshaAI", url: "https://pratyakshaai.vercel.app/" }],
  creator: "PratyakshaAI",
  publisher: "PratyakshaAI",

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
    title: "PratyakshaAI",
    description:
      "Instantly scan food and get nutrition, sugar, and health insights tailored to you.",
    url: "https://pratyakshaai.vercel.app/",
    siteName: "Food Scanner",
    images: [
      {
        url: "/logo1200630.png",
        width: 1200,
        height: 630,
        alt: "PratyakshaAI App Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  /* -------- Twitter -------- */
  twitter: {
    card: "summary_large_image",
    title: "PratyakshaAI",
    description:
      "Scan food barcodes to understand nutrition, sugar, and health impact.",
    images: ["/logo.png"],
    creator: "@yourhandle",
  },

  /* -------- Icons -------- */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo1616.png",
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
