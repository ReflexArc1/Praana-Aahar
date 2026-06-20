import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import IngredientsSection from "@/components/home/IngredientsSection";
import NutritionSection from "@/components/home/NutritionSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import HowToUseSection from "@/components/home/HowToUseSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import { product } from "@/lib/product-data";

export default function Home() {
  // Product JSON-LD Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => img.src),
    brand: {
      "@type": "Brand",
      name: "Pranaa Aahar",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: product.testimonials.length.toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <FeaturedProduct />
        <IngredientsSection />
        <NutritionSection />
        <BenefitsSection />
        <HowToUseSection />
        <ComparisonSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
