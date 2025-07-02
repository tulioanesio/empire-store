import { Link } from "react-router-dom";
import image from "../assets/image.png";

export default function NavBar() {
  return (
    <header className="text-[#F0E4CA] px-6 py-4 shadow bg-black">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={image} alt="" className="w-12 h-12" />
          <h1 className="text-xl font-semibold text-white">Empire Store</h1>
        </Link>
        <div>
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            Cart
          </button>
        </div>
      </nav>
    </header>
  );
}
