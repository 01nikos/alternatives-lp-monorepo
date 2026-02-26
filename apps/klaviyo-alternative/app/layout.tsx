import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://klavyioalternatives.com'),
  title: {
    default: 'Klaviyo Alternative | Add AI Intelligence Layer - Keep Your Stack',
    template: '%s | Klaviyo Alternative'
  },
  description: 'Don\'t replace Klaviyo. Add Phleid\'s agentic AI layer on top. Get enterprise-level intelligence for $999/month. Zero migration.',
  keywords: ['klaviyo alternative', 'agentic marketing', 'AI marketing layer', 'enterprise marketing intelligence'],
  authors: [{ name: 'Phleid' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://klavyioalternatives.com',
    title: 'Klaviyo Alternative | Add AI Intelligence Layer',
    description: 'Don\'t replace Klaviyo. Add agentic AI on top. $999/month, zero migration.',
    siteName: 'Klaviyo Alternative',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Klaviyo Alternative - Add AI Intelligence Layer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klaviyo Alternative | Add AI Intelligence Layer',
    description: 'Don\'t replace Klaviyo. Add agentic AI on top. $999/month, zero migration.',
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
