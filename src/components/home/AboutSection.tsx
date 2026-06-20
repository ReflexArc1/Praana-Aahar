"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { brandInfo } from "@/lib/product-data";
import { cn } from "@/lib/utils";

/* ---------- Animation variants ---------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ---------- Feature card icons ---------- */

function TraditionalWisdomIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("size-10", className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      <path
        d="M20 8c-2 4-6 6-6 12a6 6 0 0 0 12 0c0-6-4-8-6-12Z"
        fill="currentColor"
        opacity={0.85}
      />
      <path d="M20 22v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 26h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ModernScienceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("size-10", className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      <path
        d="M16 10v10l-4 8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2l-4-8V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="24" r="1.5" fill="currentColor" opacity={0.6} />
      <circle cx="22" cy="26" r="1" fill="currentColor" opacity={0.6} />
    </svg>
  );
}

function PureIngredientsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("size-10", className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      <path
        d="M26 12C18 14 16 20 14 26l2 1 1-2a4 4 0 0 0 2-.5c3 0 7-3 8-11a1 1 0 0 0-1-1.5Z"
        fill="currentColor"
        opacity={0.85}
      />
    </svg>
  );
}

/* ---------- Feature Card ---------- */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col items-center text-center gap-4 rounded-2xl bg-card p-6 md:p-8 shadow-sm border border-border/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-center justify-center size-16 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* ---------- AboutSection ---------- */

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-secondary py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle decorative pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233D3225' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              Crafting Your Wellness Journey
            </motion.p>
            <motion.h2
              variants={fadeUpVariants}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              About Pranaa Aahar
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {brandInfo.philosophy}
            </motion.p>
          </div>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            <FeatureCard
              icon={<TraditionalWisdomIcon />}
              title="Traditional Wisdom"
              description="Rooted in centuries-old Ayurvedic knowledge, we honour the healing power of food that Indian kitchens have cherished for generations."
            />
            <FeatureCard
              icon={<ModernScienceIcon />}
              title="Modern Science"
              description="Every blend is developed with rigorous nutritional research, lab-tested for purity, and optimised for maximum bioavailability."
            />
            <FeatureCard
              icon={<PureIngredientsIcon />}
              title="Pure Ingredients"
              description="No preservatives, no additives, no compromises. Just pure, stone-ground plant-based flours sourced from trusted farms."
            />
          </motion.div>

          {/* Lifestyle Image */}
          <motion.div
            variants={fadeUpVariants}
            className="relative rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto w-full"
          >
            <Image
              src="/images/rotis-lifestyle.png"
              alt="Fresh rotis made with Pranaa Aahar Plant Based Aata — a wholesome lifestyle"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
            {/* Subtle overlay for polish */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
