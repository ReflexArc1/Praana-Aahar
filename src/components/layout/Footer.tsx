import Link from "next/link";
import { brandInfo } from "@/lib/product-data";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Shop", href: "#featured-product" },
  { label: "Benefits", href: "#benefits" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.25_0.02_60)] text-[oklch(0.92_0.01_75)]">
      <div className="container-custom section-padding pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold text-white">
                Pranaa Aahar
              </span>
            </Link>
            <p className="text-sm italic text-[oklch(0.75_0.02_60)] mb-4">
              {brandInfo.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[oklch(0.7_0.015_60)]">
              Transforming flour from a household staple into a foundation for
              vitality, balance, and lasting wellness.
            </p>
            {/* Decorative leaf */}
            <div className="mt-4 text-[oklch(0.55_0.06_145)]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5-6 7" />
                <path d="M11.7 12.3c1-1.5 2.5-2.8 4.3-3.3" />
              </svg>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[oklch(0.7_0.015_60)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-5">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-[oklch(0.7_0.015_60)]">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0 text-[oklch(0.55_0.06_145)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span>{brandInfo.contact.address}</span>
              </div>
              {brandInfo.contact.phones.map((phone) => (
                <div key={phone} className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0 text-[oklch(0.55_0.06_145)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <a
                    href={`tel:+91${phone}`}
                    className="hover:text-white transition-colors"
                  >
                    +91 {phone}
                  </a>
                </div>
              ))}
              {brandInfo.contact.emails.map((email) => (
                <div key={email} className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0 text-[oklch(0.55_0.06_145)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-5">
              Our Promise
            </h4>
            <div className="flex flex-wrap gap-2">
              {brandInfo.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[oklch(0.55_0.06_145/0.15)] text-[oklch(0.7_0.06_145)] border border-[oklch(0.55_0.06_145/0.2)]"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[oklch(1_0_0/0.1)]">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[oklch(0.55_0.02_60)]">
            © 2024–2025 Pranaa Aahar. All rights reserved.
          </p>
          <p className="text-xs text-[oklch(0.55_0.02_60)]">
            Traditional Wisdom, Modern Nutrition
          </p>
        </div>
      </div>
    </footer>
  );
}
