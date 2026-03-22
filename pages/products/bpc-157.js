export default function BPC157() {
  return (
    <div className="container">
      <h1>BPC-157</h1>
      <p className="tagline">Advanced peptide research compound</p>

      {/* PRODUCT IMAGE */}
      <div style={{ margin: "40px 0", textAlign: "center" }}>
        <img
          src="/bpc-157.png"
          alt="BPC-157"
          style={{
            maxWidth: "300px",
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 0 40px rgba(255,255,255,0.05)"
          }}
        />
      </div>

      <div className="card">
        <h2>Overview</h2>
        <p>
          BPC-157 is a synthetic peptide derived from a protective protein found in the stomach.
          It is widely studied for its regenerative and healing properties.
        </p>

        <h3>Key Research Areas</h3>
        <ul>
          <li>Tissue repair</li>
          <li>Ligament and tendon healing</li>
          <li>Gut health support</li>
          <li>Inflammation reduction</li>
        </ul>

        <button>Request Info</button>
      </div>
    </div>
  );
}
