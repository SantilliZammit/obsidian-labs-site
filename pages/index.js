export default function Home() {
  return (
    <div className="container">

      <header className="hero">
        <h1>OBSIDIAN LABS</h1>
        <p className="tagline">Advanced Peptide Research Solutions</p>
        <p className="subtext">
          Precision peptides. Verified purity. Built for performance.
        </p>
      </header>

      <section className="products">
        <h2>Featured Compounds</h2>

        <div className="grid">
          {[
            "BPC-157",
            "TB-500",
            "CJC-1295",
            "PT-141",
            "Retatrutide",
          ].map((item) => (
            <div className="card" key={item}>
              <h3>{item}</h3>
              <p>Research-grade peptide with verified sourcing.</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
