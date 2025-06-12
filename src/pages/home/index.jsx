import { useEffect, useState } from "react";
import api from "../../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/home");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-light">
      <header className="bg-primary text-white px-6 py-4 shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-black">Empire Store</h1>
          <nav>
            <button className="bg-accent text-black px-4 py-2 rounded-md hover:bg-orange-600 transition">
              Carrinho
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow p-8">
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Featured Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-64 h-64 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-text text-center">{product.name}</h3>
                <p className="text-accent text-base font-medium mt-1 mb-3">
                  R$ {product.price.toFixed(2)}
                </p>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-900 transition">
                  Comprar
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Meu E-commerce</p>
      </footer>
    </div>
  );
}

export default Home;
