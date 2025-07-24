import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

function PreCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
    async function fetchCart() {
      try {
        const response = await api.get("/cart", {
          withCredentials: true,
        });

        setCartItems(response.data.cart.items || []);
      } catch (error) {
        console.error("Error when getting cart:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
    fetchCart();
  }, []);

  const lastItem =
    cartItems.length > 0 ? cartItems[cartItems.length - 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <NavBar user={user} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Product added to your cart!
        </h2>

        {lastItem && (
          <div className="mb-6">
            <img
              src={lastItem.productImageUrl}
              alt={lastItem.productName}
              className="w-32 h-32 object-contain mx-auto mb-2"
            />
            <p className="text-lg">{lastItem.productName}</p>
          </div>
        )}

        <p className="mb-6">
          Would you like to continue shopping or go to your cart?
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition rounded-sm"
          >
            Continue Shopping
          </Link>
          <Link
            to="/cart"
            className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition rounded-sm"
          >
            Go to Cart
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PreCart;
