"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { brandInfo } from "@/lib/product-data";
import { cn } from "@/lib/utils";

/* ---------- Decorative SVG helpers ---------- */

function LeafSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-4", className)}
      aria-hidden="true"
    >
      <path
        d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.5-3 10-10a1 1 0 0 0-.31-.83A1 1 0 0 0 17 9V8Z"
        fill="currentColor"
        opacity={0.85}
      />
      <path
        d="M11 15a4.49 4.49 0 0 0-2.62.8L7 18.56A12.07 12.07 0 0 1 11 15Z"
        fill="currentColor"
        opacity={0.5}
      />
    </svg>
  );
}

function FloatingLeaf({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("absolute text-primary/20 pointer-events-none", className)}
      animate={{
        y: [0, -12, 0],
        rotate: [0, 8, -8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="size-6 md:size-8">
        <path d="M23 5C12 8 9 15 7 22l2 1 1.5-3A6 6 0 0 0 13 19c5 0 10-4 11-13a1 1 0 0 0-1-1Z" />
      </svg>
    </motion.div>
  );
}

/* ---------- Icon map for trust badges ---------- */

function BadgeIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    leaf: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
        <path d="M15 4C8 6 6 11 4 17l1.5.7.8-1.8A4 4 0 0 0 8 15c3.5 0 7-2.5 8-9a.8.8 0 0 0-.8-.8H15V4Z" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
        <path d="M10 2L3 5v4.5c0 4.7 3 8.3 7 9.5 4-1.2 7-4.8 7-9.5V5l-7-3Zm0 2.2 5 2.2V9.5c0 3.6-2.2 6.5-5 7.5-2.8-1-5-3.9-5-7.5V8.4l5-2.2Z" />
      </svg>
    ),
    grain: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
        <circle cx="10" cy="5" r="2" />
        <circle cx="6" cy="10" r="2" />
        <circle cx="14" cy="10" r="2" />
        <circle cx="10" cy="15" r="2" />
      </svg>
    ),
    flask: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
        <path d="M8 2v6L4 15a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l-4-7V2H8Zm1 1h2v5.5l3.5 6.5H5.5L9 8.5V3Z" />
      </svg>
    ),
    recycle: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
        <path d="M10 2l3 5h-2l2 4h4l-3-5h2L10 2ZM3 11l3 5 3-5H7l2-4H5l3 5H3Zm11 0l-2 4h2l-2 4h4l-3-4h2l-1-4Z" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
        <path d="M10 17.5S2 12 2 7a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-8 10.5-8 10.5Z" />
      </svg>
    ),
  };

  return <span className="text-primary">{icons[icon] ?? icons.leaf}</span>;
}

/* ---------- Animation variants ---------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ---------- HeroSection ---------- */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Decorative floating leaves */}
      <FloatingLeaf className="top-[15%] left-[8%]" delay={0} />
      <FloatingLeaf className="top-[30%] right-[12%]" delay={1.5} />
      <FloatingLeaf className="bottom-[25%] left-[15%]" delay={3} />
      <FloatingLeaf className="top-[60%] right-[5%]" delay={2} />
      <FloatingLeaf className="bottom-[10%] right-[20%]" delay={4} />

      {/* Soft radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 50%, oklch(0.55 0.05 140 / 0.06), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ---------- Left: Text Content ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={fadeUpVariants}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <LeafSvg className="size-4" />
                Plant Powered • Nutrient Dense
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUpVariants}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground"
            >
              Wellness Begins
              <br />
              With What You{" "}
              <span className="text-primary">Eat</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Thoughtfully crafted plant-based flour designed for modern,
              health-conscious kitchens.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollTo("#featured-product")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:translate-y-px"
              >
                Shop Plant Based Aata
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.19l-2.72-2.72a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={() => scrollTo("#benefits")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/5 active:translate-y-px"
              >
                Discover The Benefits
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              {brandInfo.badges.map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5 text-primary">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- Right: Hero Image ---------- */}
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Decorative ring behind image */}
            <div
              className="absolute inset-0 m-auto w-[80%] aspect-square rounded-full bg-primary/5 blur-2xl"
              aria-hidden="true"
            />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl"
            >
              <Image
                src="/images/hero-banner.png"
                alt="Pranaa Aahar Plant Based Aata — premium plant-based flour packaging"
                width={600}
                height={600}
                priority
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
