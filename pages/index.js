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

            <div style={{ marginTop: "20px" }}>
              <Link href="/products/retatrutide" className="primary-btn">
                Explore Compounds
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
