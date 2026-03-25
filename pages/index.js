import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="home-page">
      <header className="dropdown-nav">
        <div className="dropdown-nav-inner">
          <div className="home-brand">OBSIDIAN LABS</div>

          <button
            className="dropdown-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <a href="#featured" onClick={() => setMenuOpen(false)}>
            Products
          </a>
          <a href="#why" onClick={() => setMenuOpen(false)}>
            Why Us
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </div>
      </header>

      <section className="hero-image-section">
        <div className="hero-image-overlay"></div>

        <div className="hero-image-content hero-image-content-clean">
          <div className="hero-buttons hero-buttons-lower">
            <a href="#featured" className="home-primary-btn">
              Shop Compounds
            </a>
            <a href="#why" className="home-secondary-btn">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="split-section">
        <div className="split-grid">
          <div className="split-image">
            <img src="/bpc-157.png" alt="BPC-157" />
          </div>

          <div className="split-content">
            <p className="split-eyebrow">FLAGSHIP COMPOUND</p>
            <h2>BPC-157</h2>
            <p>
              Advanced peptide for recovery, tissue repair, and regenerative
              research. Clean presentation. Premium trust signals. Serious brand
              feel.
            </p>

            <div className="split-buttons">
              <Link href="/products/bpc-157" className="home-primary-btn">
                View Product
              </Link>
              <a href="#featured" className="home-secondary-btn">
                Explore More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-strip-section">
        <div className="home-strip-grid">
          <div className="home-strip-card">
            <h3>Premium Presentation</h3>
            <p>Built to feel like a real biotech brand, not a template.</p>
          </div>
          <div className="home-strip-card">
            <h3>Secure Checkout</h3>
            <p>Live cart drawer, clean flow, and streamlined checkout UX.</p>
          </div>
          <div className="home-strip-card">
            <h3>Research Grade</h3>
            <p>Luxury dark-mode styling with lab-first positioning.</p>
          </div>
        </div>
      </section>

      <section className="home-section home-fade-up" id="featured">
        <div className="home-section-header">
          <p className="home-section-eyebrow">FEATURED COMPOUNDS</p>
          <h2>Built like a brand, not a template.</h2>
          <p>
            Premium product detail pages, live cart experience, and a storefront
            designed to convert.
          </p>
        </div>

        <div className="home-product-grid">
          <Link
            href="/products/retatrutide"
            className="home-product-card elite-product-card"
          >
            <div className="home-product-image-wrap">
              <img
                src="/retatrutide-60mg.png"
                alt="Retatrutide"
                className="home-product-image"
              />
            </div>
            <div className="home-product-info">
              <h3>Retatrutide</h3>
              <p>Advanced metabolic peptide with premium clinical branding.</p>
              <div className="home-product-meta">
                <span>From $129.99</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>

          <Link
            href="/products/bpc-157"
            className="home-product-card elite-product-card"
          >
            <div className="home-product-image-wrap">
              <img
                src="/bpc-157.png"
                alt="BPC-157"
                className="home-product-image"
              />
            </div>
            <div className="home-product-info">
              <h3>BPC-157</h3>
              <p>Advanced peptide for tissue repair and regenerative research.</p>
              <div className="home-product-meta">
                <span>From $49.99</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>

          <Link
            href="/products/tb-500"
            className="home-product-card elite-product-card"
          >
            <div className="home-product-image-wrap">
              <img
                src="/tb-500.png"
                alt="TB-500"
                className="home-product-image"
              />
            </div>
            <div className="home-product-info">
              <h3>TB-500</h3>
              <p>Recovery-focused peptide for repair, healing, and research.</p>
              <div className="home-product-meta">
                <span>From $59.99</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>

          <Link
            href="/products/pt-141"
            className="home-product-card elite-product-card"
          >
            <div className="home-product-image-wrap">
              <img
                src="/pt141-10mg.png"
                alt="PT-141"
                className="home-product-image"
              />
            </div>
            <div className="home-product-info">
              <h3>PT-141</h3>
              <p>
                Advanced peptide for libido, performance, and neurological
                signaling research.
              </p>
              <div className="home-product-meta">
                <span>From $79.99</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-section home-split-section home-fade-up" id="why">
        <div className="home-split-card">
          <p className="home-section-eyebrow">WHY OBSIDIAN</p>
          <h2>Dark, modern, premium, clinical.</h2>
          <p>
            A biotech storefront built to feel expensive the second it loads.
            Better product pages. Better trust. Better conversion flow.
          </p>

          <ul className="home-feature-list">
            <li>Premium product pages</li>
            <li>Pop-out cart drawer with live subtotal</li>
            <li>Secure Stripe checkout</li>
            <li>Luxury biotech visual identity</li>
          </ul>
        </div>

        <div className="home-split-card home-glow-card">
          <p className="home-section-eyebrow">TRUST + EXPERIENCE</p>
          <h2>Designed to feel credible and elite.</h2>
          <p>
            Clean spacing, high-end dark mode, controlled glow, and a strong
            product-first buying experience.
          </p>

          <div className="home-badge-row">
            <span>Secure Checkout</span>
            <span>COA Access</span>
            <span>Research Use Only</span>
            <span>Premium Lab Grade</span>
          </div>
        </div>
      </section>

      <section className="home-section home-fade-up home-cta-section" id="contact">
        <div className="home-cta-card">
          <p className="home-section-eyebrow">READY TO SHOP</p>
          <h2>Explore the Obsidian Labs line.</h2>
          <p>
            Premium product pages, clean cart flow, and a storefront built to
            scale with your catalog.
          </p>

          <div className="home-hero-buttons">
            <a href="#featured" className="home-primary-btn">
              Shop Now
            </a>
            <a
              href="mailto:info@obsidianlabs.com"
              className="home-secondary-btn"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
            }
