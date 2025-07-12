import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import ErrorIcon from "@mui/icons-material/Error";

function Cancel() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name });
      } catch (err) {
        console.error("Error decoding token:", err);
        navigate("/");
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <NavBar user={user} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <ErrorIcon fontSize="large" className="text-red-500 mb-4" />

        <h2 className="text-2xl font-semibold mb-4">
          Operation canceled, the Empire awaits your loyalty.
        </h2>

        <p className="mb-6">
          Would you like to continue shopping or try again?
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

export default Cancel;
