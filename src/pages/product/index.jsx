import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import NavBar from "../../components/NavBar";
import BuyNow from "../../components/BuyNow";
import Footer from "../../components/Footer";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();

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
    async function fetchProduct() {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Error getting product:", error);
      }
    }
    fetchUser();
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <NavBar user={user} />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10 bg-zinc-900 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full max-w-md h-auto object-contain rounded-lg shadow"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-emerald-400 text-2xl font-semibold">
                $ {product.price.toFixed(2)}
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                Amount: {product.stock} un.
              </p>
            </div>

            <p className="text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            <BuyNow productId={product.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;
