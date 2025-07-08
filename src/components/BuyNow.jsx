import api from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BuyNow({ productId }) {
  async function handleBuyNow() {
    try {
      const token = localStorage.getItem("token");

      await api.post(`/cart/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Produto adicionado ao carrinho com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar produto ao carrinho.");
      console.error("Erro ao adicionar produto ao carrinho:", error);
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

      <ToastContainer theme="dark" autoClose={3000} position="bottom-right"/>
    </>
  );
}
