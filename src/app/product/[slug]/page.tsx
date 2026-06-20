"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { product, brandInfo } from "@/lib/product-data";
import { motion } from "motion/react";

export default function ProductPage() {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
                <Image
                  src={product.images[selectedImage].src}
                  alt={product.images[selectedImage].alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
                  {brandInfo.tagline}
                </p>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading text-3xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-muted-foreground">/ {product.weight}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {brandInfo.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
                  >
                    ✓ {badge}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="font-medium w-10 text-center text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-lg h-14"
                  onClick={handleAddToCart}
                >
                  {added ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Added to Cart!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                      Add to Cart — ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </span>
                  )}
                </Button>
              </div>

              <Separator />

              {/* Ingredients */}
              <div>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  Key Ingredients
                </h3>
                <div className="space-y-3">
                  {product.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5-6 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {ingredient.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {ingredient.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Quick Facts */}
              <div>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  Nutrition Highlights
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.nutrition.values.slice(0, 6).map((item) => (
                    <div
                      key={item.nutrient}
                      className="text-center p-3 rounded-lg bg-secondary/50"
                    >
                      <p className="text-lg font-bold text-primary">
                        {item.value}
                        <span className="text-xs font-normal text-muted-foreground ml-0.5">
                          {item.unit}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.nutrient}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
