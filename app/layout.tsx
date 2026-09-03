import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";

import "@/app/globals.css";

import DisableInspect from "@/app/components/DisableInspect";
import SmoothScroll from "@/app/components/SmoothScroll";

import { Instrument_Serif } from "next/font/google";

import "@/app/globals.css";
import CookieConsent from "./components/CookieConsent";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3872",
};

const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.westernstationapartments.com"),

  title: {
    default: "Western Station at Fossil Creek | Apartments in Fort Worth, TX",
    template: "%s | Western Station at Fossil Creek",
  },

  description:
    "Discover Western Station at Fossil Creek in North Fort Worth. Explore spacious 1, 2 and 3 bedroom apartments, premium amenities, floor plans and leasing options.",

  keywords: [
    "Western Station Apartments",
    "Western Station at Fossil Creek",
    "Fort Worth Apartments",
    "North Fort Worth Apartments",
    "Apartments in Fort Worth TX",
    "Fossil Creek Apartments",
    "Apartments near I-35",
    "Apartments near Loop 820",
    "Luxury Apartments Fort Worth",
    "Pet Friendly Apartments Fort Worth",
    "1 Bedroom Apartments Fort Worth",
    "2 Bedroom Apartments Fort Worth",
    "3 Bedroom Apartments Fort Worth",
    "Apartments with Attached Garage",
  ],

  applicationName: "Western Station at Fossil Creek",

  authors: [
    {
      name: "Western Station at Fossil Creek",
      url: "https://www.westernstationapartments.com",
    },
  ],

  creator: "Western Station at Fossil Creek",
  publisher: "Western Station at Fossil Creek",
  category: "Real Estate",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.westernstationapartments.com",
    siteName: "Western Station at Fossil Creek",
    title: "Western Station at Fossil Creek | Fort Worth, TX",
    description:
      "Modern apartment living in North Fort Worth with spacious 1, 2 and 3 bedroom homes, premium amenities and convenient access to I-35 and Loop 820.",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 1200,
        height: 630,
        alt: "Western Station at Fossil Creek",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Western Station at Fossil Creek | Fort Worth, TX",
    description:
      "Discover spacious apartment homes and premium amenities in North Fort Worth.",
    images: ["/apple-touch-icon.png"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  referrer: "origin-when-cross-origin",

  other: {
    "geo.region": "US-TX",
    "geo.placename": "Fort Worth",
  },
};

const apartmentSchema = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",

  name: "Western Station at Fossil Creek",

  description:
    "Western Station at Fossil Creek offers spacious one, two and three bedroom apartment homes in North Fort Worth, Texas.",

  url: "https://www.westernstationapartments.com",

  image: "https://www.westernstationapartments.com/images/og-image.jpg",

  telephone: "+1-817-577-8666",

  priceRange: "$$",

  address: {
    "@type": "PostalAddress",
    streetAddress: "6700 Sand shell Blvd",
    addressLocality: "Fort Worth",
    addressRegion: "TX",
    postalCode: "76137",
    addressCountry: "US",
  },

  email: "wstmanager@livenjoymgt.com",

  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Resident Lounge",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "24 Hour Fitness Center",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Swimming Pools",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Pet Friendly",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Bark Park",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Gated Community",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Attached Garages",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Outdoor Kitchen",
      value: true,
    },
  ],

  numberOfBedrooms: ["1", "2", "3"],

  petsAllowed: true,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={instrumentSerif.variable}
    >
      <body className="min-h-screen font-sans antialiased">
        {/* Google Tag Manager */}
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
        {/* Disable Developer Tools */}
        {process.env.NODE_ENV === "production" && <DisableInspect />}
        <Script
          id="schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(apartmentSchema),
          }}
        />
        <Script
          id="rentbamboo-charles"
          src="https://charles.rentbamboo.com/w"
          data-client-id="bamboo_1l359uhj"
          data-position="right"
          data-color="#1E3872"
        />
        "{/* Smooth Scrolling */}
        <SmoothScroll />
        <CookieConsent />
        {/* Application */}
        {children}
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#1E3872",
              color: "#ffffff",
              borderRadius: "12px",
              fontFamily: '"Plus Jakarta Sans Variable", sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
