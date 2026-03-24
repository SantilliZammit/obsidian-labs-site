import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-nav elite-nav">
        <div className="home-brand">OBSIDIAN LABS</div>
        <nav className="home-nav-links">
          <a href="#featured">Products</a>
          <a href="#research">Research</a>
          <a href="#contact">Contact</a>
          <Link href="/cart">Cart</Link>
        </nav>
      </header>

      <section className="home-hero elite-hero">
        <div className="home-hero-overlay"></div>
        <div className="home-orb home-orb-1"></div>
        <div className="home-orb home-orb-2"></div>
        <div className="home-orb home-orb-3"></div>

        <div className="elite-hero-grid">
          <div className="home-hero-content elite-hero-copy">
            <p className="home-eyebrow">PREMIUM RESEARCH COMPOUNDS</p>

            <h1 className="home-title">
              Precision Peptides.
              <br />
              Luxury Presentation.
            </h1>

            <p className="home-subtitle">
              A modern peptide storefront with premium product pages, elevated
              bottle design, and a clean biotech identity built to feel sharp,
              expensive, and unforgettable.
            </p>

            <div className="home-hero-buttons">
              <a href="#featured" className="home-primary-btn">
                Explore Compounds
              </a>
              <a href="#research" className="home-secondary-btn">
                Why Obsidian
              </a>
            </div>
          </div>

          <div className="elite-hero-product">
            <div className="elite-hero-product-wrap">
              <div className="elite-hero-glow"></div>
              <img
                src="/bpc-157.png"
                alt="BPC-157"
                className="elite-hero-bottle"
              />
            </div>

            <div className="elite-hero-caption">
              <span className="elite-hero-caption-label">Featured Compound</span>
              <span className="elite-hero-caption-name">BPC-157</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-fade-up" id="featured">
        <div className="home-section-header">
          <p className="home-section-eyebrow">FEATURED COMPOUNDS</p>
          <h2>Built like a brand, not a template.</h2>
          <p>
            Product presentation matters. Clean spacing, premium visuals, and
            strong layout make each compound feel intentional and high-end.
          </p>
        </div>

        <div className="home-product-grid">
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
              <p>Advanced peptide for metabolic and weight management research.</p>
              <div className="home-product-meta">
                <span>From $129.99</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>

          <Link
            href="/products/cjc-1295"
            className="home-product-card elite-product-card"
          >
            <div className="home-product-image-wrap home-placeholder-wrap">
              <div className="home-placeholder-text">CJC-1295</div>
            </div>

            <div className="home-product-info">
              <h3>CJC-1295</h3>
              <p>Growth-pathway research presented with a premium storefront feel.</p>
              <div className="home-product-meta">
                <span>Research Compound</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>

          <Link
            href="/products/pt-141"
            className="home-product-card elite-product-card"
          >
            <div className="home-product-image-wrap home-placeholder-wrap">
              <div className="home-placeholder-text">PT-141</div>
            </div>

            <div className="home-product-info">
              <h3>PT-141</h3>
              <p>Designed to feel modern, clinical, polished, and premium.</p>
              <div className="home-product-meta">
                <span>Research Compound</span>
                <span className="home-product-link">View Product →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section
        className="home-section home-split-section home-fade-up"
        id="research"
      >
        <div className="home-split-card">
          <p className="home-section-eyebrow">WHY OBSIDIAN</p>
          <h2>Dark, modern, premium, clinical.</h2>
          <p>
            The brand should feel like a high-end peptide lab with elite visual
            discipline: black glass, controlled glow, strong spacing, and clean
            luxury storefront structure.
          </p>

          <ul className="home-feature-list">
            <li>Premium product detail pages</li>
            <li>Luxury dark-mode visual identity</li>
            <li>Clean variant pricing experience</li>
            <li>Animated dropdown research information</li>
          </ul>
        </div>

        <div className="home-split-card home-glow-card">
          <p className="home-section-eyebrow">STORE EXPERIENCE</p>
          <h2>Designed to feel expensive the second it loads.</h2>
          <p>
            Your homepage should instantly communicate trust, design intent,
            premium positioning, and a real brand identity instead of feeling
            like a basic product dump.
          </p>

          <div className="home-badge-row">
            <span>Premium Lab Grade</span>
            <span>Luxury Presentation</span>
            <span>Research Use Only</span>
          </div>
        </div>
      </section>

      <section className="home-section home-fade-up" id="contact">
        <div className="home-cta-card">
          <p className="home-section-eyebrow">READY TO EXPAND</p>
          <h2>Launch a storefront that actually looks elite.</h2>
          <p>
            Premium homepage, premium product pages, stronger visual identity,
            and a storefront structure built to grow with your product line.
          </p>

          <div className="home-hero-buttons">
            <a href="#featured" className="home-primary-btn">
              Shop Products
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
