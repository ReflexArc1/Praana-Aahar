"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pb-4">
          <SheetTitle className="font-heading text-xl">
            Your Cart
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-sans font-normal text-muted-foreground">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              Your cart is empty
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Discover our premium plant-based aata and start your wellness
              journey.
            </p>
            <Button
              onClick={() => {
                setIsCartOpen(false);
                document
                  .getElementById("featured-product")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <div className="flex flex-col min-h-0 flex-1">
            <div className="overflow-y-auto -mx-6 px-6 space-y-4 pb-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-lg bg-secondary/50"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.weight}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      ₹{item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto w-7 h-7 rounded-md flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
              <Separator className="mb-4" />
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-heading font-bold">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Shipping calculated at checkout
              </p>
              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
