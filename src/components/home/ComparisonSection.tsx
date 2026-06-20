"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const features = [
  { feature: "Plant Based", pranaa: true, wheat: false },
  { feature: "High Fibre", pranaa: true, wheat: "Limited" },
  { feature: "Gluten Friendly", pranaa: true, wheat: false },
  { feature: "Potassium Rich", pranaa: true, wheat: "Low" },
  { feature: "No Preservatives", pranaa: true, wheat: "Varies" },
  { feature: "No Additives", pranaa: true, wheat: "Varies" },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="w-5 h-5 text-destructive"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export default function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="comparison" className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose Pranaa Aahar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how we compare to regular wheat flour
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3">
              <div className="px-6 py-4 bg-muted/50">
                <span className="text-sm font-semibold text-foreground">Feature</span>
              </div>
              <div className="px-6 py-4 bg-primary/10 border-x border-primary/20 text-center">
                <span className="text-sm font-bold text-primary">Pranaa Aahar</span>
              </div>
              <div className="px-6 py-4 bg-muted/50 text-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  Regular Wheat Flour
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {features.map((item, index) => (
                <motion.div
                  key={item.feature}
                  className="grid grid-cols-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                >
                  <div
                    className={`px-6 py-4 flex items-center ${
                      index % 2 === 0 ? "bg-card" : "bg-muted/20"
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.feature}
                    </span>
                  </div>
                  <div
                    className={`px-6 py-4 flex items-center justify-center border-x border-primary/10 ${
                      index % 2 === 0 ? "bg-primary/5" : "bg-primary/[0.07]"
                    }`}
                  >
                    <CheckIcon />
                  </div>
                  <div
                    className={`px-6 py-4 flex items-center justify-center ${
                      index % 2 === 0 ? "bg-card" : "bg-muted/20"
                    }`}
                  >
                    {item.wheat === false ? (
                      <CrossIcon />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {item.wheat}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
