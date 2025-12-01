import "./Home.scss";
import Products from "./Products/Products";

function HomePage() {
  return (
    <main className="home">
      <section className="home-container">
        <div className="home__header">
          <h1 className="home__title">Our Products</h1>
          <p className="home__subtitle">Radical gear from the 90s</p>
        </div>

        <Products />
      </section>
    </main>
  );
}

export default HomePage;
