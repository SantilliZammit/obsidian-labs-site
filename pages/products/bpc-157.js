import Link from "next/link";

export default function BPC157() {
  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-hero single-column">
        <div className="product-copy centered-copy">
          <p className="eyebrow">OBSIDIAN LABS</p>

          <h1 className="product-title">BPC-157 Research</h1>

          <p className="product-subtitle">
            Advanced peptide for tissue repair and regenerative research
          </p>

          <div className="product-tags centered-tags">
            <span className="tag-pill">10 mg</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>
        </div>

        <div className="product-image-wrap">
          <div className="product-image-stack">
            <img src="/bpc-157.png" alt="BPC-157" className="product-image" />
            <img
              src="/bpc-157.png"
              alt="BPC-157 reflection"
              className="product-reflection"
            />
          </div>
        </div>
      </section>

      <section className="product-panel">
        <h2>Overview</h2>

        <p>
          BPC-157 is a synthetic peptide derived from a protective protein found
          in the stomach. It is widely studied for its regenerative and healing
          properties at the cellular level.
        </p>

        <h3>Key Research Areas</h3>

        <ul>
          <li>Tissue repair</li>
          <li>Ligament and tendon healing</li>
          <li>Gut health support</li>
          <li>Inflammation modulation</li>
        </ul>

        <div className="product-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
        </div>
      </section>
    </div>
  );
}
