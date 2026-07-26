import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  Truck,
  Youtube,
} from "lucide-react";
import { footerColumns, footerTrust } from "@/content/footer";
import { contactDetails, site } from "@/content/site";
import { FooterBrandCarousel } from "@/components/layout/FooterBrandCarousel";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const trustIcons = [ShieldCheck, Truck, RefreshCw];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-shell">
        {/* 1. CTA + Newsletter */}
        <div className="footer-cta">
          <div className="footer-cta-blue">
            <p className="footer-cta-label">
              <span className="footer-cta-label-bar" aria-hidden="true" />
              Partner With ARP
            </p>
            <h2>Let&apos;s Build Winning Partnerships</h2>
            <p>Join a network of global brands and grow with ARP across the UAE.</p>
            <LinkButton href="/wholesale" variant="secondary" className="footer-cta-btn">
              Partner With Us
            </LinkButton>
          </div>

          <div className="footer-cta-image" aria-hidden="true">
            <Image
              src={site.assets.footerRunner}
              alt=""
              fill
              sizes="(max-width: 1100px) 100vw, 32vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          <form className="newsletter" action="/api/forms/contact" method="post">
            <span className="newsletter-icon" aria-hidden="true">
              <Activity size={18} strokeWidth={2.4} />
            </span>
            <h2>Stay in the Game</h2>
            <p>Subscribe for the latest product launches, news, and exclusive partner updates.</p>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="newsletter-row">
              <input id="newsletter-email" name="email" type="email" placeholder="Enter your email" required />
              <button aria-label="Subscribe" type="submit">
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            <label className="checkbox-label">
              <input type="checkbox" name="consent" required />
              <span>I agree to receive communications from ARP Group.</span>
            </label>
          </form>
        </div>

        {/* 2. Multi-column nav */}
        <div className="footer-main">
          <div className="footer-identity">
            <Logo />
            <p>Official sports brand distribution partner in the UAE. Trusted by champions worldwide.</p>
            <div className="social-links" aria-label="Social links">
              <Link href="#" aria-label="Facebook">
                <Facebook size={17} aria-hidden="true" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram size={17} aria-hidden="true" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin size={17} aria-hidden="true" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="footer-column">
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={link.emphasize ? "footer-link-em" : undefined}
                >
                  {link.label}
                  {link.emphasize ? <ArrowRight size={13} aria-hidden="true" /> : null}
                </Link>
              ))}
            </div>
          ))}

          <div className="footer-column footer-contact">
            <h3>Contact</h3>
            <a href={`tel:${contactDetails.telephone.replace(/\s/g, "")}`}>
              <Phone size={15} aria-hidden="true" />
              {contactDetails.telephone}
            </a>
            <a href={`mailto:${contactDetails.email}`}>
              <Mail size={15} aria-hidden="true" />
              {contactDetails.email}
            </a>
            <span>
              <MapPin size={15} aria-hidden="true" />
              {contactDetails.officeAddress}
            </span>
            <LinkButton href="/faq" variant="secondary" className="footer-contact-btn" showArrow>
              Help Centre
            </LinkButton>
          </div>
        </div>

        {/* 3. Brands + trust */}
        <div className="footer-brand-bar">
          <FooterBrandCarousel />

          <div className="footer-trust" aria-label="Trust signals">
            {footerTrust.map((item, index) => {
              const Icon = trustIcons[index] ?? ShieldCheck;
              return (
                <div key={item.title} className="footer-trust-item">
                  <Icon size={18} aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Legal */}
        <div className="footer-legal">
          <p>© 2024 ARP Group. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
            <button type="button" className="footer-locale" aria-label="Region: UAE">
              <span className="footer-locale-flag" aria-hidden="true" />
              UAE
              <ChevronDown size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
