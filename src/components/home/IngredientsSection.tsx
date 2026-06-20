"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { product } from "@/lib/product-data";
import { cn } from "@/lib/utils";

/* ---------- Animation variants ---------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const cardStaggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ---------- Ingredient SVG Icons ---------- */

function BananaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("size-12", className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity={0.15} />
      <path
        d="M18 12c-2 1-4 4-4.5 8-.5 4 .5 8 3.5 11s7 4 11 3.5 7-3 8.5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 12c1 0 3 2 4 5s1.5 7 .5 10-3 5.5-5 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
      <circle cx="36" cy="28.5" r="1.5" fill="currentColor" opacity={0.5} />
    </svg>
  );
}

function CassavaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("size-12", className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity={0.15} />
      <ellipse
        cx="24"
        cy="26"
        rx="6"
        ry="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        transform="rotate(-15 24 26)"
      />
      <path
        d="M22 16c-1-2-1-4 0-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M26 16c0-2 1-4 2.5-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 17c0-3 .5-5 .5-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 23h6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.3}
      />
      <path
        d="M21 27h6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.3}
      />
    </svg>
  );
}

function ChickpeaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("size-12", className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity={0.15} />
      <circle cx="20" cy="22" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="28" cy="22" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="24" cy="29" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="20" cy="22" r="1.5" fill="currentColor" opacity={0.15} />
      <circle cx="28" cy="22" r="1.5" fill="currentColor" opacity={0.15} />
      <circle cx="24" cy="29" r="1.5" fill="currentColor" opacity={0.15} />
    </svg>
  );
}

/* ---------- Ingredient Card ---------- */

function IngredientCard({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col items-center text-center gap-4 rounded-2xl bg-card p-6 md:p-8 border border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
    >
      {/* Subtle gradient accent at top */}
      <div
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="flex items-center justify-center size-20 rounded-2xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary/12 group-hover:scale-105">
        {icon}
      </div>

      <h3 className="font-heading text-xl font-semibold text-foreground">
        {name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* ---------- Ingredient icon map ---------- */

const ingredientIconMap: Record<string, React.ReactNode> = {
  "Raw Banana Flour": <BananaIcon />,
  "Cassava Flour": <CassavaIcon />,
  "Chickpea Flour": <ChickpeaIcon />,
};

/* ---------- IngredientsSection ---------- */

export default function IngredientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative bg-background py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 80%, oklch(0.55 0.05 140 / 0.04), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-12 md:gap-16"
        >
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <motion.p
              variants={fadeUpVariants}
              className="text-sm font-medium tracking-widest uppercase text-primary mb-3"
            >
              Three powerful plant-based flours, thoughtfully combined
            </motion.p>
            <motion.h2
              variants={fadeUpVariants}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
            >
              Crafted From Nature&apos;s Finest
            </motion.h2>
          </div>

          {/* Hero ingredient image */}
          <motion.div
            variants={fadeUpVariants}
            className="relative rounded-2xl overflow-hidden shadow-lg max-w-5xl mx-auto w-full"
          >
            <Image
              src="/images/ingredient-flatlay.png"
              alt="A flat lay of raw banana, cassava, and chickpea — the three star ingredients of Pranaa Aahar"
              width={1400}
              height={600}
              className="w-full h-auto object-cover"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-foreground/8 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Ingredient Cards */}
          <motion.div
            variants={cardStaggerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {product.ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.name}
                name={ingredient.name}
                description={ingredient.description}
                icon={ingredientIconMap[ingredient.name] ?? <BananaIcon />}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
