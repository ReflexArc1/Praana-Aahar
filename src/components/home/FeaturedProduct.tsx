"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { product, brandInfo } from "@/lib/product-data";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

/* ---------- Animation variants ---------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ---------- Icons ---------- */

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn("size-4", className)}
      aria-hidden="true"
    >
      <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3h13.07a.75.75 0 0 1 .733.917l-1.5 7A.75.75 0 0 1 16.75 11.5H6.16l.27 1.5h9.82a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.74-.627L3.63 3.033a.25.25 0 0 0-.248-.217H1.75A.75.75 0 0 1 1 2.066V1.75ZM7 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn("size-4", className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    </svg>
  );
}

/* ---------- FeaturedProduct ---------- */

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = useCallback(() => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].src,
        weight: product.weight,
      },
      quantity
    );

    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  }, [addItem, quantity]);

  return (
    <section
      ref={sectionRef}
      id="featured-product"
      className="relative bg-background py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
            Our Signature Product
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Featured Product
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ---------- Left: Product Image ---------- */}
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center"
          >
            <div className="relative group cursor-pointer">
              {/* Glow behind image */}
              <div
                className="absolute inset-4 rounded-3xl bg-primary/8 blur-2xl transition-all duration-500 group-hover:blur-3xl group-hover:bg-primary/12"
                aria-hidden="true"
              />
              <Image
                src={product.images[0].src}
                alt={`${product.name} — premium plant-based flour by Pranaa Aahar`}
                width={520}
                height={520}
                className="relative w-full max-w-md h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* ---------- Right: Product Info ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-5"
          >
            {/* Product name */}
            <motion.h3
              variants={fadeUpVariants}
              className="font-heading text-3xl md:text-4xl font-bold text-foreground"
            >
              {product.name}
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base text-muted-foreground leading-relaxed max-w-lg"
            >
              {product.shortDescription}
            </motion.p>

            {/* Price */}
            <motion.div
              variants={fadeUpVariants}
              className="flex items-baseline gap-2"
            >
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                ₹{product.price}
              </span>
              <span className="text-base text-muted-foreground">
                / {product.weight}
              </span>
            </motion.div>

            {/* Badges */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap gap-2"
            >
              {brandInfo.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Quantity + Add to Cart */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
            >
              {/* Quantity selector */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex items-center justify-center size-10 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <MinusIcon />
                </button>
                <span className="flex items-center justify-center w-12 h-10 text-sm font-medium text-foreground border-x border-border">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex items-center justify-center size-10 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                >
                  <PlusIcon />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className={cn(
                  "relative inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-medium shadow-sm transition-all active:translate-y-px",
                  showAdded
                    ? "bg-green-600 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
                )}
              >
                <AnimatePresence mode="wait">
                  {showAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <CheckIcon />
                      Added!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <CartIcon />
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>

            {/* View full details link */}
            <motion.div variants={fadeUpVariants}>
              <Link
                href={`/product/${product.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 group"
              >
                View Full Details
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.19l-2.72-2.72a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
