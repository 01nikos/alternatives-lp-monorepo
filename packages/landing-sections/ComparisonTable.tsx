"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card } from "@repo/ui";
import { fadeInUp } from "@repo/config";

interface ComparisonTableProps {
  headline: string;
  competitor: "klaviyo" | "braze";
}

export function ComparisonTable({ headline, competitor }: ComparisonTableProps) {
  const data = competitor === "klaviyo"
    ? {
        col1: "Keep Klaviyo As-Is",
        col2: "Migrate to Salesforce/Adobe",
        rows: [
          {
            feature: "Cost",
            col1: "Current spend",
            col2: "$100K-$500K/year",
            col3: "$999-$1,500/month"
          },
          {
            feature: "Agentic Intelligence",
            col1: false,
            col2: true,
            col3: true,
            col1Text: "Manual workflows",
            col2Text: "Built-in",
            col3Text: "AI layer on top"
          },
          {
            feature: "Cross-tool Coordination",
            col1: false,
            col2: true,
            col3: true,
            col1Text: "Siloed",
            col2Text: "Native",
            col3Text: "Via Phleid"
          },
          {
            feature: "Migration Required",
            col1: "N/A",
            col2: "6-12 months",
            col3: false,
            col3Text: "Zero (keep all tools)"
          },
          {
            feature: "Risk",
            col1: "Falling behind",
            col2: "Massive disruption",
            col3: "None"
          },
          {
            feature: "Time to Value",
            col1: "N/A",
            col2: "6-12 months",
            col3: "48 hours"
          }
        ]
      }
    : {
        col1: "Keep Tools As-Is",
        col2: "Buy Braze",
        rows: [
          {
            feature: "Cost",
            col1: "Current spend",
            col2: "$100K-$500K/year",
            col3: "$999-$1,500/month"
          },
          {
            feature: "Target Market",
            col1: "N/A",
            col2: "Enterprise only",
            col3: "Mid-market DTC"
          },
          {
            feature: "Learning Curve",
            col1: "N/A",
            col2: "Steep (6+ months)",
            col3: "48 hours to insights"
          },
          {
            feature: "Agentic Intelligence",
            col1: false,
            col2: true,
            col3: true,
            col1Text: "Manual",
            col2Text: "Built-in",
            col3Text: "AI layer"
          },
          {
            feature: "Migration Required",
            col1: "N/A",
            col2: "Yes (6-12 months)",
            col3: false,
            col3Text: "Zero"
          },
          {
            feature: "Time to Value",
            col1: "N/A",
            col2: "6-12 months",
            col3: "48 hours"
          }
        ]
      };

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {headline}
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4 px-4 font-semibold"></th>
                  <th className="text-center py-4 px-4 font-semibold">{data.col1}</th>
                  <th className="text-center py-4 px-4 font-semibold">{data.col2}</th>
                  <th className="text-center py-4 px-4 font-semibold bg-blue-50 rounded-t-lg">
                    <div className="text-blue-700">Add Phleid AI Layer ⭐</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.col1 === 'boolean'
                        ? (row.col1 ? <Check className="inline h-5 w-5 text-green-600" /> : <X className="inline h-5 w-5 text-red-500" />)
                        : <span className="text-muted-foreground">{row.col1Text || row.col1}</span>
                      }
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.col2 === 'boolean'
                        ? (row.col2 ? <Check className="inline h-5 w-5 text-green-600" /> : <X className="inline h-5 w-5 text-red-500" />)
                        : <span className="text-muted-foreground">{row.col2Text || row.col2}</span>
                      }
                    </td>
                    <td className="py-4 px-4 text-center bg-blue-50">
                      {typeof row.col3 === 'boolean'
                        ? (row.col3 ? <Check className="inline h-5 w-5 text-green-600" /> : <X className="inline h-5 w-5 text-red-500" />)
                        : <span className="font-semibold text-blue-700">{row.col3Text || row.col3}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-6">
            {data.rows.map((row, index) => (
              <Card key={index} className="p-4">
                <div className="font-semibold mb-3">{row.feature}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{data.col1}:</span>
                    <span>{typeof row.col1 === 'boolean' ? (row.col1 ? "✓" : "✗") : row.col1Text || row.col1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{data.col2}:</span>
                    <span>{typeof row.col2 === 'boolean' ? (row.col2 ? "✓" : "✗") : row.col2Text || row.col2}</span>
                  </div>
                  <div className="flex justify-between bg-blue-50 p-2 rounded">
                    <span className="text-blue-700 font-medium">Phleid:</span>
                    <span className="text-blue-700 font-semibold">{typeof row.col3 === 'boolean' ? (row.col3 ? "✓" : "✗") : row.col3Text || row.col3}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
