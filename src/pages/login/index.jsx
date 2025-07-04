import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hide from "../../assets/Hide.png";
import Show from "../../assets/Show.png";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import trooper from "../../assets/trooper.png";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/cart");
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("Unregistered unit. Please enlist before accessing the system.");
      } else if (err.response?.status === 401) {
        toast.error("Authentication failed. Check your credentials, Trooper.");
      } else {
        toast.error(err);
      }
    }
  }

  return (
    <div className="bg-[#09090B] min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-zinc-900 h-[550px] p-8 w-full max-w-md rounded-md shadow-lg">
          <img src={trooper} alt="Trooper" className="mx-auto mb-4 w-12 h-12" />
          <h1 className="text-center text-[#E0E0E0] font-bold text-2xl mb-2">
            Welcome back, Trooper!
          </h1>
          <p className="text-[#E0E0E0] text-md text-center">
            Time to report for duty.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-12">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#E0E0E0] text-md">
                Imperial ID (Email)
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="name@example.com"
                className="px-3 py-2 rounded-md bg-[#2A2A3C] text-[#E0E0E0] placeholder-[#2c729e] focus:outline-none focus:ring-2 focus:ring-[#4bb1f1]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[#E0E0E0] text-md">
                Access Code (Password)
              </label>
              <div className="relative w-full">
                <input
                  ref={passwordRef}
                  type={isRevealPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pr-8 px-3 py-2 rounded-md bg-[#2A2A3C] text-[#E0E0E0] placeholder-[#2c729e] focus:outline-none focus:ring-2 focus:ring-[#4bb1f1]"
                  required
                />
                <div
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-2 hover:bg-[#4b4b6c]"
                  title={isRevealPwd ? "Hide password" : "Show password"}
                  onClick={() => setIsRevealPwd((prev) => !prev)}
                >
                  <img
                    src={isRevealPwd ? Show : Hide}
                    alt="Toggle password visibility"
                    style={{ width: "16px", height: "16px" }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-2 bg-[#3B3B5C] text-[#78BAFD] font-bold rounded-md hover:bg-[#4b4b6c] transition-colors"
            >
              Access Imperial Systems
            </button>
            <ToastContainer theme="dark" />
            <p className="text-sm text-[#9CA3AF] text-center">
              Not enlisted yet?{" "}
              <Link
                to="#"
                className="text-[#4bb1f1] hover:text-white underline"
              >
                Join the Empire today.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
