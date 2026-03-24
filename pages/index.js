import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-nav">
        <div className="home-brand">OBSIDIAN LABS</div>
        <nav className="home-nav-links">
          <a href="#featured">Products</a>
          <a href="#research">Research</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-hero-overlay"></div>
        <div className="home-hero-content">
          <p className="home-eyebrow">PREMIUM RESEARCH COMPOUNDS</p>
          <h1 className="home-title">
            Precision Peptides.
            <br />
            Elevated Design.
          </h1>
          <p className="home-subtitle">
            High-end research compounds presented with a clean biotech aesthetic,
            premium formulation identity, and a modern direct-to-consumer feel.
          </p>

          <div className="home-hero-buttons">
            <a href="#featured" className="home-primary-btn">
              Explore Compounds
            </a>
            <a href="#research" className="home-secondary-btn">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="home-section" id="featured">
        <div className="home-section-header">
          <p className="home-section-eyebrow">FEATURED COMPOUNDS</p>
          <h2>Built like a premium brand, not a generic shop.</h2>
          <p>
            Clean presentation, luxury visual identity, and a focused product
            lineup designed to feel sharp, modern, and credible.
          </p>
        </div>

        <div className="home-product-grid">
          <Link href="/products/bpc-157" className="home-product-card">
            <div className="home-product-image-wrap">
              <img src="/bpc-157.png" alt="BPC-157" className="home-product-image" />
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

          <Link href="/products/tb-500" className="home-product-card">
            <div className="home-product-image-wrap">
              <img src="/tb-500.png" alt="TB-500" className="home-product-image" />
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

          <Link href="/products/cjc-1295" className="home-product-card">
            <div className="home-product-image-wrap home-placeholder-wrap">
              <div className="home-placeholder-text">CJC-1295</div>
            </div>
            <div className="home-product-info">
              <h3>CJC-1295</h3>
              <p>Growth-hormone pathway support in a premium research format.</p>
              <div className="home-product-meta">
                <span>Research Compound</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>

          <Link href="/products/pt-141" className="home-product-card">
            <div className="home-product-image-wrap home-placeholder-wrap">
              <div className="home-placeholder-text">PT-141</div>
            </div>
            <div className="home-product-info">
              <h3>PT-141</h3>
              <p>Modern peptide presentation with a clean luxury storefront feel.</p>
              <div className="home-product-meta">
                <span>Research Compound</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-section home-split-section" id="research">
        <div className="home-split-card">
          <p className="home-section-eyebrow">WHY OBSIDIAN</p>
          <h2>Luxury biotech styling with a real storefront structure.</h2>
          <p>
            Your site should feel intentional: sharp typography, controlled glow,
            strong spacing, and product cards that look like a premium brand
            instead of a basic template.
          </p>
          <ul className="home-feature-list">
            <li>Premium product page layouts</li>
            <li>Clear variant pricing structure</li>
            <li>Animated dropdown information panels</li>
            <li>Brand-consistent bottle presentation</li>
          </ul>
        </div>

        <div className="home-split-card home-glow-card">
          <p className="home-section-eyebrow">BRAND DIRECTION</p>
          <h2>Dark, clinical, premium, modern.</h2>
          <p>
            The goal is to feel like a high-end peptide lab with an elevated
            visual identity: black glass, soft cyan glow, disciplined spacing,
            and a strong product-first experience.
          </p>
          <div className="home-badge-row">
            <span>Premium Lab Grade</span>
            <span>Modern Storefront</span>
            <span>Research Use Only</span>
          </div>
        </div>
      </section>

      <section className="home-section home-cta-section" id="contact">
        <div className="home-cta-card">
          <p className="home-section-eyebrow">READY TO BUILD IT OUT</p>
          <h2>Launch a storefront that actually feels expensive.</h2>
          <p>
            Clean homepage, premium product pages, consistent bottle branding,
            and a layout that looks more like a real luxury biotech company.
          </p>
          <div className="home-hero-buttons">
            <a href="#featured" className="home-primary-btn">
              Shop Products
            </a>
            <a href="mailto:info@obsidianlabs.com" className="home-secondary-btn">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
              }
