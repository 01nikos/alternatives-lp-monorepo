"use client";

import {
  Hero,
  ThreeOptions,
  PainPoints,
  SolutionShowcase,
  ComparisonTable,
  FAQ,
  LeadCaptureForm,
} from "@repo/landing-sections";

export default function BrazeAlternativePage() {
  const scrollToForm = () => {
    const formSection = document.getElementById("lead-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Phleid",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered agentic layer for marketing stacks. Coordinates across Braze, Shopify, and other tools to provide enterprise-level intelligence.",
    "offers": {
      "@type": "Offer",
      "price": "999",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "billingDuration": "P1M",
        "price": "999-1500"
      }
    },
    "operatingSystem": "Web",
    "url": "https://brazealternatives.com"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need to replace Braze?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! Phleid sits on top of Braze. You keep all your existing tools—Braze, Shopify, loyalty programs, reviews, support. Phleid adds the AI intelligence layer that coordinates across everything."
        }
      },
      {
        "@type": "Question",
        "name": "How does pricing work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flat-rate pricing from $999-$1,500/month based on your company size, not email volume or contact count. No surprises, no scaling fees as you grow."
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-amber-50">
      <Hero
        headline="Searching for Braze Alternatives? There's a Better Option."
        subheadline="Don't buy expensive enterprise platforms. Add AI intelligence on top. Keep your tools, gain enterprise-level agentic marketing for $999/month."
        primaryCTA={{
          text: "See What AI Can Do For Your Stack",
          subtext: "Free 48-hour analysis, zero setup",
          onClick: scrollToForm,
        }}
        visual="before-after-stack"
      />

      <ThreeOptions
        options={[
          {
            number: 1,
            title: "Keep Braze As-Is",
            description: "Fall behind competitors who have AI",
            icon: "😕",
          },
          {
            number: 2,
            title: "Migrate to Enterprise Platform",
            description: "$100K+/year, 6-12 months disruption",
            icon: "💸",
          },
          {
            number: 3,
            title: "Add Phleid AI Layer",
            description: "$999/month, zero migration, enterprise intelligence",
            icon: "🚀",
            recommended: true,
          },
        ]}
      />

      <PainPoints
        headline="The Market Moved to Agentic Marketing. Your Competitors Have It. You Don't."
        points={[
          {
            icon: "Brain",
            title: "Competitors have AI coordination",
            description:
              "Enterprise platforms have AI orchestrating their entire stack. You're stuck with manual workflows.",
          },
          {
            icon: "GitBranch",
            title: "Your tools work in silos",
            description:
              "Braze can't coordinate with your loyalty, reviews, support, and Shopify data.",
          },
          {
            icon: "TrendingDown",
            title: "You're falling behind",
            description:
              "The gap widens every week. You need agentic intelligence, not just another email tool.",
          },
        ]}
      />

      <SolutionShowcase
        headline="The Agentic Layer for Your Existing Stack"
        source="braze"
      />

      <ComparisonTable headline="Your Three Options" competitor="braze" />

      <FAQ source="braze" />

      <div id="lead-form">
        <LeadCaptureForm
          headline="Don't Replace Your Stack. Upgrade It With AI."
          subheadline="See what enterprise-level agentic marketing can do for your Braze stack"
          source="braze"
          placement="footer"
          showExampleReport={true}
        />
      </div>
      </main>
    </>
  );
}
