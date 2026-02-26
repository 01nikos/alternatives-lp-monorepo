"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@repo/ui";
import { fadeInUp, staggerContainer } from "@repo/config";

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    subtext: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: string;
    onClick?: () => void;
  };
  visual?: string;
}

export function Hero({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  visual = "before-after-stack",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            {subheadline}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
                onClick={primaryCTA.onClick}
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <span className="text-xs text-muted-foreground">
                {primaryCTA.subtext}
              </span>
            </div>

            {secondaryCTA && (
              <Button
                variant="ghost"
                size="lg"
                onClick={secondaryCTA.onClick}
              >
                {secondaryCTA.text}
              </Button>
            )}
          </motion.div>

          {/* Trust element */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-sm text-muted-foreground"
          >
            Trusted by 500+ mid-market DTC brands
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
