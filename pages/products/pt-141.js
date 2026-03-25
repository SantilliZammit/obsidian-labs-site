import Link from "next/link";

export default function PT141() {
  return (
    <section className="product-section pt141">
      <div className="product-container">

        {/* Image */}
        <div className="product-image">
          <img src="/pt141-10mg.png" alt="PT-141 10mg" />
        </div>

        {/* Content */}
        <div className="product-content">
          <p className="product-sub">FLAGSHIP COMPOUND</p>
          <h2 className="product-title">PT-141</h2>

          <p className="product-desc">
            Advanced peptide designed to support performance, drive, and neurological signaling.
            Clean presentation. Premium trust signals. Serious brand feel.
          </p>

          <div className="product-buttons">
            <Link href="/products/pt-141" className="home-primary-btn">
              Add to Cart
            </Link>
            <a href="#featured" className="home-secondary-btn">
              Explore More
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
