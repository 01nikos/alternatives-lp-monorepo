"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@repo/ui";
import { fadeInUp, staggerContainer } from "@repo/config";

interface Option {
  number: number;
  title: string;
  description: string;
  icon: string;
  recommended?: boolean;
}

interface ThreeOptionsProps {
  options: Option[];
}

export function ThreeOptions({ options }: ThreeOptionsProps) {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
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
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            You Have Three Options
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            When your current tools can't keep up, here's what most brands consider:
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {options.map((option) => (
              <motion.div key={option.number} variants={fadeInUp}>
                <Card
                  className={`relative h-full transition-all ${
                    option.recommended
                      ? "border-2 border-blue-600 shadow-lg scale-105"
                      : "hover:shadow-md"
                  }`}
                >
                  {option.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white">
                        Recommended
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{option.icon}</div>
                      <div className="text-sm font-semibold text-muted-foreground">
                        Option {option.number}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
