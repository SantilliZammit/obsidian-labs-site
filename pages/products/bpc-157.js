export default function BPC157() {
  return (
    <div className="container">
      {/* HERO */}
      <section className="product-hero">
        <h1 className="product-title">BPC-157</h1>
        <p className="product-subtitle">
          Advanced peptide for tissue repair and regenerative research
        </p>

        <div className="product-image-wrap">
          <img src="/bpc-157.png" alt="BPC-157" className="product-image" />
        </div>
      </section>

      {/* INFO PANEL */}
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

        <button className="primary-btn">Request Research Access</button>
      </section>
    </div>
  );
}
