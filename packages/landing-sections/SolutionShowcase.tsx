"use client";

import { motion } from "framer-motion";
import { Check, Zap, ShieldCheck, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, Badge } from "@repo/ui";
import { fadeInUp, staggerContainer } from "@repo/config";

interface SolutionShowcaseProps {
  headline: string;
  source: "klaviyo" | "braze" | "hubspot" | "salesforce";
}

export function SolutionShowcase({ headline, source }: SolutionShowcaseProps) {
  const features = [
    {
      icon: Zap,
      title: "Cross-tool A/B Testing",
      description: "4,000+ combinations tested weekly across your entire stack"
    },
    {
      icon: Clock,
      title: "Stack Intelligence Report",
      description: "Identify hidden revenue opportunities in 48 hours"
    },
    {
      icon: TrendingUp,
      title: "Weekly Strategic Briefs",
      description: "AI-validated patterns and recommended actions"
    },
    {
      icon: ShieldCheck,
      title: "Cautious Mode",
      description: "AI proposes actions, you approve before execution"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              The Solution
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {headline}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AI layer that sits on top of {source === "klaviyo" ? "Klaviyo" : "your tools"} + Shopify + Loyalty + Reviews + Support.
              Coordinates across ALL tools like enterprise platforms do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-none shadow-md h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                          <feature.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$999-$1,500</div>
                <div className="text-sm text-muted-foreground">per month (flat-rate)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">48 hours</div>
                <div className="text-sm text-muted-foreground">to first insights</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2 flex items-center justify-center gap-2">
                  <Check className="h-8 w-8" /> Zero
                </div>
                <div className="text-sm text-muted-foreground">migration required</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
