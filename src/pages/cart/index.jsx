import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name });
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
      }
    }

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

    fetchCart();
  }, []);

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
              <li key={item.id} className="bg-zinc-900 p-4 rounded-xl shadow">
                <div className="flex justify-between items-center">
                  <div>
                    
                    <h2 className="text-lg font-semibold">
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
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
