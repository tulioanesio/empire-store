import { Link, Links } from "react-router-dom";
import empire from "../assets/empire.png";
import trooper from "../assets/trooper.png";
import millenium from "../assets/millenium.png";

export default function NavBar() {
  return (
    <header className="bg-black px-6 py-4 shadow">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={empire} alt="Empire Store Logo" className="w-12 h-12" />
          <h1 className="text-xl font-semibold text-white">Empire Store</h1>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center text-white text-sm">
            <Link to="/" className="flex items-center gap-2 underline">
              <img
                src={millenium}
                alt=""
                className="w-6 h-6"
              />
              <p>Cart</p>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <img src={trooper} alt="Trooper Icon" className="w-6 h-6" />
            <p>
              <Link to="/login" className="underline hover:text-orange-600">
                Login, Trooper <br />
              </Link>{" "}
              or{" "}
              <Link to="#" className="underline hover:text-orange-600">
                sign up for duty.
              </Link>
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
