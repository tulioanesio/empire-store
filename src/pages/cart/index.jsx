import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

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
        console.error("Erro ao decodificar token:", err);
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
      console.error("Erro ao buscar carrinho:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id) {
    try {
      await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error("Erro ao remover item:", error);
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

      <main className="flex-grow px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-zinc-400">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-zinc-900 p-4 rounded-xl shadow flex items-center justify-between gap-4 w-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className="w-28 h-28 object-contain rounded"
                  />
                  <div className="flex flex-col justify-between">
                    <h2 className="text-lg font-semibold mb-1">
                      {item.productName}
                    </h2>
                    <p className="text-emerald-400">
                      ${" "}
                      {(item.productPrice * item.quantity).toFixed(2)}{" "}
                      <span className="text-zinc-400 text-sm">
                        (x{item.quantity})
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm transition"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xl font-bold mt-6">
          Total: ${total.toFixed(2)}
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
