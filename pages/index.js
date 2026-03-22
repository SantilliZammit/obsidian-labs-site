export default function Home() {
  const products = [
    { name: "BPC-157", slug: "bpc-157" },
    { name: "TB-500", slug: "tb-500" },
    { name: "CJC-1295", slug: "cjc-1295" },
    { name: "PT-141", slug: "pt-141" },
    { name: "Retatrutide", slug: "retatrutide" },
  ];

  return (
    <div className="container">
      <h1>OBSIDIAN LABS</h1>
      <p className="tagline">Advanced Peptide Research Solutions</p>
      <p className="subtext">
        Precision peptides. Verified purity. Built for performance.
      </p>

      <h2>Featured Compounds</h2>

      <div className="grid">
        {products.map((item) => (
          <div className="card" key={item.slug}>
            <h3>{item.name}</h3>
            <p>Research-grade peptide with verified sourcing.</p>
            <a href={`/products/${item.slug}`}>
              <button>View Details</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
