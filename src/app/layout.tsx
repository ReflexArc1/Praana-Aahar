import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/components/providers/CartProvider";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranaa Aahar Plant Based Aata | Nutrient Dense Wellness Flour",
  description:
    "Discover Pranaa Aahar's premium plant-based aata made with raw banana, cassava, and chickpea flour. Rich in fibre, potassium, and essential nutrients.",
  keywords: [
    "plant based flour",
    "wellness flour",
    "raw banana flour",
    "cassava flour",
    "chickpea flour",
    "gluten free aata",
    "healthy roti flour",
    "pranaa aahar",
    "nutrient dense flour",
    "gut health flour",
    "diabetic friendly flour",
    "high fibre flour",
    "plant powered nutrition",
  ],
  openGraph: {
    title: "Pranaa Aahar Plant Based Aata | Nutrient Dense Wellness Flour",
    description:
      "Discover Pranaa Aahar's premium plant-based aata made with raw banana, cassava, and chickpea flour. Rich in fibre, potassium, and essential nutrients.",
    siteName: "Pranaa Aahar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranaa Aahar Plant Based Aata | Nutrient Dense Wellness Flour",
    description:
      "Discover Pranaa Aahar's premium plant-based aata made with raw banana, cassava, and chickpea flour. Rich in fibre, potassium, and essential nutrients.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
