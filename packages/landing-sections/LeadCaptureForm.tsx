"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button, Input, Card } from "@repo/ui";
import { fadeInUp } from "@repo/config";

interface LeadCaptureFormProps {
  headline: string;
  subheadline: string;
  source: "klaviyo" | "braze" | "hubspot" | "salesforce";
  placement: "hero" | "pain-points" | "footer";
  showExampleReport?: boolean;
}

export function LeadCaptureForm({
  headline,
  subheadline,
  source,
  placement,
  showExampleReport = false,
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Capture UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get("utm_source"),
        utm_medium: urlParams.get("utm_medium"),
        utm_campaign: urlParams.get("utm_campaign"),
        utm_content: urlParams.get("utm_content"),
        utm_term: urlParams.get("utm_term"),
      };

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source,
          placement,
          utmParams,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Track conversion
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "form_success", {
            source,
            placement,
            email: formData.email,
          });
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-8 border-2 border-green-500">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-4">You're on the list!</h3>
              <p className="text-muted-foreground mb-6">
                Check your email for:
              </p>
              <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Stack Intelligence Report (delivered in 48 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Calendar link to book a demo</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{headline}</h2>
            <p className="text-lg text-muted-foreground">{subheadline}</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Work email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Company name"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    See What AI Can Do For Your Stack
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Free 48-hour analysis • Zero setup • No credit card
              </p>

              {showExampleReport && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    See Example Report →
                  </button>
                </div>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
