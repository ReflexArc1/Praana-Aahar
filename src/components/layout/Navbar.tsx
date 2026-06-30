"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingBag, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#", sectionId: "" },
  { label: "Shop", href: "#featured-product", sectionId: "featured-product" },
  { label: "Benefits", href: "#benefits", sectionId: "benefits" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
] as const;

const SECTION_IDS = [
  "featured-product",
  "benefits",
  "about",
  "contact",
] as const;

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section — only on homepage
  useEffect(() => {
    if (!isHomePage) return;

    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) setActiveSection(`#${sectionId}`);
            });
          },
          { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    const handleScrollTop = () => {
      if (window.scrollY < 100) setActiveSection("#");
    };
    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [isHomePage]);

  // Reset active section when leaving homepage
  useEffect(() => {
    if (!isHomePage) setActiveSection("");
  }, [isHomePage]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const offset = 80;
      if (sectionId === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("#");
        return;
      }
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(`#${sectionId}`);
      }
    },
    []
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent, sectionId: string, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (isHomePage) {
        // Already on homepage — just smooth scroll
        scrollToSection(sectionId);
      } else {
        // On another page — navigate to homepage then scroll to section
        if (sectionId === "") {
          router.push("/");
        } else {
          router.push(`/#${sectionId}`);
        }
      }
    },
    [isHomePage, router, scrollToSection]
  );

  // After navigating to homepage with a hash, scroll to the section
  useEffect(() => {
    if (!isHomePage) return;
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace("#", "");
      // Small delay for page to render
      const timer = setTimeout(() => scrollToSection(sectionId), 100);
      return () => clearTimeout(timer);
    }
  }, [isHomePage, scrollToSection]);

  const isLinkActive = (href: string) => isHomePage && activeSection === href;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-sm shadow-foreground/5"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary transition-transform duration-300 group-hover:rotate-12"
          >
            <path
              d="M14 3C14 3 6 8 6 16C6 20.4183 9.58172 24 14 24C18.4183 24 22 20.4183 22 16C22 8 14 3 14 3Z"
              fill="currentColor"
              fillOpacity="0.15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 24V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14 18C11 15 9 14 9 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14 15C17 12 19 11 19 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Pranaa Aahar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={isHomePage ? link.href : `/${link.href}`}
              onClick={(e) => handleNavClick(e, link.sectionId, link.href)}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                isLinkActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary transition-opacity duration-150",
                  isLinkActive(link.href) ? "opacity-100" : "opacity-0"
                )}
              />
            </a>
          ))}
        </div>

        {/* Right side — Cart + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>

            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <span className="font-heading text-lg">Pranaa Aahar</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 pt-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={(e) => handleNavClick(e, link.sectionId, link.href)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      isLinkActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="mt-4 flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <ShoppingBag className="size-4" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
