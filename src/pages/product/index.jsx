import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Carregando produto...</p>;
  }

  return (
    <main className="min-h-screen py-45">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center mb-6">{product.name}</h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-64 h-64 object-contain"
          />
          <div className="flex-1 space-y-4">
            <p className="text-2xl font-semibold text-accent">
              R${product.price.toFixed(2)}
            </p>
            <p className="text-muted">Estoque: {product.stock}</p>
            <p>{product.description}</p>
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-blue-900 transition">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
