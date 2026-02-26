import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://brazealternatives.com'),
  title: {
    default: 'Braze Alternative | Affordable Agentic Marketing for Mid-Market',
    template: '%s | Braze Alternative'
  },
  description: 'Priced out of Braze? Add Phleid\'s agentic AI layer to your current stack. Get enterprise-level intelligence for $999/month. No $100K+ contract.',
  keywords: ['braze alternative', 'affordable braze', 'agentic marketing', 'mid-market marketing automation'],
  authors: [{ name: 'Phleid' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brazealternatives.com',
    title: 'Braze Alternative | Affordable Agentic Marketing',
    description: 'Get enterprise agentic intelligence for $999/month. No $100K+ Braze contract required.',
    siteName: 'Braze Alternative',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Braze Alternative - Affordable Agentic Marketing',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Braze Alternative | Affordable Agentic Marketing',
    description: 'Get enterprise agentic intelligence for $999/month.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
