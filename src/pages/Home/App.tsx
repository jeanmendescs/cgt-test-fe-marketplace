import Header from "@components/Header/Header";
function cartItems(): string[] {
  return [];
}

function HomePage() {
  return (
    <main>
      <Header cartItemsCount={cartItems().length} />
    </main>
  );
}

export default HomePage;
