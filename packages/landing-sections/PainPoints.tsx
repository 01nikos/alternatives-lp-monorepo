"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { fadeInUp, staggerContainer } from "@repo/config";

interface PainPoint {
  icon: keyof typeof Icons;
  title: string;
  description: string;
}

interface PainPointsProps {
  headline: string;
  points: PainPoint[];
}

export function PainPoints({ headline, points }: PainPointsProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 max-w-4xl mx-auto"
          >
            {headline}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {points.map((point, index) => {
              const IconComponent = Icons[point.icon] as React.ComponentType<{ className?: string }>;

              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-none shadow-lg">
                    <CardHeader>
                      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{point.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{point.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
