import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name });
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }

    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.cart.items || []);
    } catch (error) {
      console.error("Error when getting cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId) {
    try {
      await api.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  async function checkout() {
    try {
      const response = await api.get(
        "/checkout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Erro in checkout:", error);
      toast.error("Failed to initiate checkout");
    }
  }

  const total = cartItems.reduce((acc, item) => {
    return acc + item.productPrice * item.quantity;
  }, 0);

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

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-red-500 tracking-wide">
          Your Imperial Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-zinc-400 text-lg">
            Your cart is empty. The Dark Side is patient.
          </p>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition duration-300 hover:border-red-500"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className="w-32 h-32 object-contain rounded-xl border border-zinc-700"
                  />
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {item.productName}
                    </h2>
                    <p className="text-green-400 text-lg">
                      ${item.productPrice.toFixed(2)}{" "}
                      <span className="text-zinc-400 text-sm">
                        x{item.quantity}
                      </span>
                    </p>
                    <p className="text-zinc-400 text-sm mt-1">
                      Subtotal: $
                      {(item.productPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="cursor-pointer self-start md:self-center text-red-500 hover:text-red-700 transition-all"
                  title="Remove from cart"
                >
                  <DeleteIcon fontSize="large" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <div className="mt-10 flex flex-col items-end space-y-4">
            <p className="text-2xl font-bold text-white">
              Total: <span className="text-green-400">${total.toFixed(2)}</span>
            </p>
            <button
              onClick={checkout}
              className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-6 py-3 rounded-lg text-white font-bold tracking-wide shadow-lg hover:shadow-red-800/40 transition duration-300 animate-pulse"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </main>

      <ToastContainer theme="dark" autoClose={2000} position="bottom-right" />

      <Footer />
    </div>
  );
}

export default Cart;
