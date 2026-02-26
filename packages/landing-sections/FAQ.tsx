"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui";
import { fadeInUp } from "@repo/config";

interface FAQProps {
  source: "klaviyo" | "braze";
}

export function FAQ({ source }: FAQProps) {
  const faqs = source === "klaviyo"
    ? [
        {
          question: "Do I need to replace Klaviyo?",
          answer: "No! Phleid sits on top of Klaviyo. You keep all your existing tools—Klaviyo, Shopify, loyalty programs, reviews, support. Phleid adds the AI intelligence layer that coordinates across everything."
        },
        {
          question: "What's an 'agentic layer'?",
          answer: "An agentic layer is AI that coordinates across your entire marketing stack—like enterprise platforms have built-in. Instead of each tool working in silos, Phleid's AI identifies patterns across Klaviyo, Shopify, loyalty, reviews, and support to find hidden revenue opportunities."
        },
        {
          question: "How does pricing work?",
          answer: "Flat-rate pricing from $999-$1,500/month based on your company size, not email volume or contact count. No surprises, no scaling fees as you grow."
        },
        {
          question: "How long until I see results?",
          answer: "Your Stack Intelligence Report is delivered in 48 hours. This identifies underused features and revenue opportunities across your entire stack. Weekly strategic briefs start immediately after onboarding."
        },
        {
          question: "Is this risky?",
          answer: "Zero risk. No migration required, no disruption to your current workflows, no credit card needed for the free Stack Intelligence Report. You can cancel anytime if it's not working for you."
        },
        {
          question: "What if I'm not ready to commit?",
          answer: "Start with the free Stack Intelligence Report. We'll analyze your stack and show you exactly what opportunities you're missing—no commitment required. See the value before deciding."
        }
      ]
    : [
        {
          question: "Do I need an enterprise budget to get agentic marketing?",
          answer: "No! Braze targets enterprises with $100K+/year budgets. Phleid brings the same agentic intelligence to mid-market brands for $999-$1,500/month."
        },
        {
          question: "What's an 'agentic layer'?",
          answer: "An agentic layer is AI that coordinates across your entire marketing stack—what Braze does for enterprises. Instead of manual campaigns and siloed data, Phleid's AI identifies patterns and opportunities across all your tools automatically."
        },
        {
          question: "How is this different from Braze?",
          answer: "Braze is an enterprise platform that requires replacing your current tools, 6-month implementation, and steep learning curve. Phleid adds AI intelligence on top of your existing tools with zero migration and 48-hour setup."
        },
        {
          question: "How long until I see results?",
          answer: "Your Stack Intelligence Report is delivered in 48 hours—no 6-month implementation. Weekly strategic briefs with AI-validated patterns start immediately after onboarding."
        },
        {
          question: "Is this risky?",
          answer: "Zero risk. No migration required, no disruption to your current workflows, no credit card needed for the free Stack Intelligence Report. You can cancel anytime."
        },
        {
          question: "What if I'm not ready?",
          answer: "Start with the free Stack Intelligence Report. We'll show you exactly what agentic intelligence can do for your stack—no commitment required."
        }
      ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-white rounded-lg px-6 border shadow-sm">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
