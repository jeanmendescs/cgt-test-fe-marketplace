import { Helmet } from "react-helmet-async";
import "./Home.scss";
import Products from "./Products/Products";

function HomePage() {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const homeUrl = `${baseUrl}/`;

  return (
    <>
      <Helmet>
        <title>90s Marketplace</title>
        <meta
          name="description"
          content="Discover our collection of radical gear from the 90s. Browse our products and find the perfect retro items for your collection."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={homeUrl} />
        <meta
          property="og:title"
          content="Our Products - Radical Gear from the 90s"
        />
        <meta
          property="og:description"
          content="Discover our collection of radical gear from the 90s. Browse our products and find the perfect retro items for your collection."
        />

        {/* X (formerly Twitter) */}
        <meta name="x:card" content="summary" />
        <meta name="x:url" content={homeUrl} />
        <meta
          name="x:title"
          content="Our Products - Radical Gear from the 90s"
        />
        <meta
          name="x:description"
          content="Discover our collection of radical gear from the 90s. Browse our products and find the perfect retro items for your collection."
        />
      </Helmet>

      <main className="home">
        <section className="home-container">
          <div className="home__header">
            <h1 className="home__title">Our Products</h1>
            <p className="home__subtitle">Radical gear from the 90s</p>
          </div>

          <Products />
        </section>
      </main>
    </>
  );
}

export default HomePage;
