import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Success() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

    async function clearCart() {
      try {
        await api.delete("/clear", {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }

    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <NavBar user={user} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <CheckCircleIcon fontSize="large" className="text-emerald-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">
          Transaction complete, the Empire thanks you for your tribute.
        </h2>

        <p className="mb-6">Would you like to continue shopping?</p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition rounded-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Success;
