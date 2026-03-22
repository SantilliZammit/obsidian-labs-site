import Link from "next/link";

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
      <nav className="nav">
        <div className="logo">OBSIDIAN</div>
        <div className="links">
          <a>Products</a>
          <a>Research</a>
          <a>Contact</a>
        </div>
      </nav>

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
          {products.map((item) => (
            <div className="card" key={item.slug}>
              <h3>{item.name}</h3>
              <p>Research-grade peptide with verified sourcing.</p>

              <Link href={`/products/${item.slug}`} className="button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
