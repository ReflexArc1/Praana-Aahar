"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { product } from "@/lib/product-data";

const keyNutrients = [
  {
    nutrient: "Energy",
    value: "354.6",
    unit: "kcal",
    color: "oklch(0.70 0.10 60)",
    bg: "oklch(0.70 0.10 60 / 0.1)",
  },
  {
    nutrient: "Fibre",
    value: "4.46",
    unit: "g",
    color: "oklch(0.55 0.06 145)",
    bg: "oklch(0.55 0.06 145 / 0.1)",
  },
  {
    nutrient: "Potassium",
    value: "282.6",
    unit: "mg",
    color: "oklch(0.70 0.10 60)",
    bg: "oklch(0.70 0.10 60 / 0.1)",
  },
  {
    nutrient: "Iron",
    value: "1.70",
    unit: "mg",
    color: "oklch(0.55 0.06 145)",
    bg: "oklch(0.55 0.06 145 / 0.1)",
  },
];

export default function NutritionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nutrition" className="bg-secondary section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nutrition Facts
          </h2>
          <p className="text-muted-foreground text-lg">
            Per {product.nutrition.servingSize} serving
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Nutrition Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
          >
            <div className="px-6 py-4 bg-primary/5 border-b border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Nutritional Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Per {product.nutrition.servingSize}
              </p>
            </div>
            <div className="divide-y divide-border">
              {product.nutrition.values.map((item, index) => (
                <motion.div
                  key={item.nutrient}
                  className={`flex items-center justify-between px-6 py-3.5 ${
                    index % 2 === 0 ? "bg-card" : "bg-secondary/30"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
                >
                  <span className="text-sm font-medium text-foreground">
                    {item.nutrient}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {item.value}
                    <span className="text-muted-foreground font-normal ml-1">
                      {item.unit}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Nutrient Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {keyNutrients.map((nutrient, index) => (
              <motion.div
                key={nutrient.nutrient}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="relative bg-card rounded-2xl border border-border p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: nutrient.bg }}
                >
                  <div
                    className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
                    style={{ borderColor: nutrient.color }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ color: nutrient.color }}
                    >
                      {nutrient.value}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {nutrient.unit}
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {nutrient.nutrient}
                </p>
              </motion.div>
            ))}

            {/* Additional highlight card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="col-span-2 bg-primary/5 rounded-2xl border border-primary/20 p-6 text-center"
            >
              <p className="text-sm text-primary font-medium">
                💡 Low in fat, high in essential minerals — designed for
                everyday wellness.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
