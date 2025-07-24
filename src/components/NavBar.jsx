import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../services/api.js";
import empire from "../assets/empire.png";
import trooper from "../assets/trooper.png";
import millenium from "../assets/millenium.png";

export default function NavBar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function handleLogout() {
    await api.get("/logout", { withCredentials: true });
    window.location.reload()
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside); 
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-black px-6 py-4 shadow">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={empire} alt="Empire Store Logo" className="w-12 h-12" />
          <h1 className="text-xl font-semibold text-white">Empire Store</h1>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center text-white text-sm">
            <Link to="/cart" className="flex items-center gap-2 underline">
              <img src={millenium} alt="Cart Icon" className="w-6 h-6" />
              <p>Cart</p>
            </Link>
          </div>

          {user ? (
            <div
              ref={dropdownRef}
              className="relative flex items-center gap-2 text-white text-sm select-none group"
            >
              <img src={trooper} alt="Trooper Icon" className="w-6 h-6" />
              <p
                className="cursor-pointer hover:text-orange-300"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span className="text-orange-400 font-semibold flex items-center gap-1 border border-zinc-700 px-2 py-1 rounded-md hover:bg-zinc-800 transition">
                  {user?.name?.split(" ")[0]}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </p>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-28 border border-zinc-800 bg-zinc-900 rounded shadow-lg z-10 transition-all duration-200">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 rounded transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white text-sm">
              <img src={trooper} alt="Trooper Icon" className="w-6 h-6" />
              <p>
                <Link to="/login" className="underline hover:text-orange-600">
                  Login, Trooper <br />
                </Link>{" "}
                or{" "}
                <Link
                  to="/register"
                  className="underline hover:text-orange-600"
                >
                  sign up for duty.
                </Link>
              </p>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
