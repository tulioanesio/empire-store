import api from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function BuyNow({ productId }) {
  const navigate = useNavigate();

  async function handleBuyNow() {
    try {
      await api.get("/me", { withCredentials: true });

      await api.post(`/cart/${productId}`, null, {
        withCredentials: true,
      });

      navigate("/precart");
      toast.success("The Empire has seized the product for you!");
    } catch (error) {
      console.log(error.response.status);
      const status = error.response?.status;
      if (status === 401) {
        setTimeout(() => navigate("/login"), 2500);
        toast.error(
          "You must be aligned with the Empire to add to the cart. Redirecting..."
        );
      } else {
        toast.error("Imperial systems malfunctioned, product not added.");
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleBuyNow}
        className="mt-4 border-1 border-white hover:bg-black hover:cursor-pointer text-white px-6 py-2 rounded-sm transition w-full"
      >
        Buy Now
      </button>

      <ToastContainer theme="dark" autoClose={2000} position="bottom-right" />
    </>
  );
}
