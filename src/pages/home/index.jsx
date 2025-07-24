import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import NavBar from "../../components/NavBar";
import BuyNow from "../../components/BuyNow";
import Footer from "../../components/Footer";
import poster from "../../assets/poster.png";

function Home() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/me", { withCredentials: true });
        const user = response.data.user;
        if (user) {
          setUser({ name: user.name });
        }
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/home`, {
          params: {
            search: searchTerm,
          },
        });
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <NavBar user={user} />

      <main className="flex-grow px-4 md:px-12 py-8">
        <div className="w-full rounded-xl overflow-hidden mb-10 shadow-lg">
          <img
            src={poster}
            alt="Empire Store Banner"
            className="w-full object-cover object-center"
          />
        </div>

        <section>
          <h2 className="text-3xl font-bold text-balance text-white mb-8 border-b border-zinc-800 pb-4">
            Featured Products
          </h2>

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search products..."
            className="w-full mb-6 p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
            value={searchTerm}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <article className="bg-zinc-900 hover:bg-zinc-800 rounded-2xl p-5 shadow-md transition hover:scale-[1.03] flex flex-col items-center text-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-52 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold truncate w-full">
                    {product.name}
                  </h3>
                  <p className="text-emerald-400 font-medium mt-1 text-base">
                    $ {product.price.toFixed(2)}
                  </p>

                  <BuyNow productId={product.id} />
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
