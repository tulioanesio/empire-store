import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import NavBar from "../../components/NavBar";
import teste from "../../assets/teste.png";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <NavBar />
      <main className="flex-grow p-8">
        
        <section>
          <h2 className="text-2xl font-bold text-white text-text mb-6">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <article
                  key={product.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-64 h-64 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-text text-center truncate w-full">
                    {product.name}
                  </h3>
                  <p className="text-accent text-base font-medium mt-1 mb-3">
                    $ {product.price.toFixed(2)}
                  </p>

                  <button className="bg-white text-black px-8 py-2 rounded hover:bg-black hover:text-white transition border-1">
                    Buy Now
                  </button>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-primary text-black text-center py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Empire Store</p>
      </footer>
    </div>
  );
}

export default Home;
