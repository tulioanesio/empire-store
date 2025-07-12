import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hide from "../../assets/Hide.png";
import Show from "../../assets/Show.png";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import user from "../../assets/user.png";

function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/register", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      toast.success("You are now enlisted. Welcome to the Empire.", {
        autoClose: 500,
      });

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("This Imperial ID is already registered.");
      }
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="bg-[#09090B] min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-zinc-900 p-8 w-full max-w-md rounded-md shadow-lg">
          <img src={user} alt="Trooper" className="mx-auto mb-4 w-12 h-12" />
          <h1 className="text-center text-[#E0E0E0] font-bold text-2xl mb-2">
            Enlist Now for duty!
          </h1>
          <p className="text-[#E0E0E0] text-md text-center">
            Your clearance is required to proceed, enlist now.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[#E0E0E0] text-md">
                Designation (Name)
              </label>
              <input
                ref={nameRef}
                type="text"
                placeholder="Name"
                className="px-3 py-2 rounded-md bg-[#1E1E1E] text-[#E0E0E0] placeholder-[#D32F2F] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#E0E0E0] text-md">
                Imperial ID (Email)
              </label>
              <input
                ref={emailRef}
                type="text"
                placeholder="E-mail"
                className="px-3 py-2 rounded-md bg-[#1E1E1E] text-[#E0E0E0] placeholder-[#D32F2F] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
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
                  className="w-full pr-8 px-3 py-2 rounded-md bg-[#1E1E1E] text-[#E0E0E0] placeholder-[#D32F2F] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  required
                />
                <div
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-2 hover:bg-[#4b4b6c]"
                  title={isRevealPwd ? "Esconder senha" : "Mostrar senha"}
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
              className="py-2 bg-[#D32F2F] text-white font-bold rounded-md hover:bg-[#B71C1C] transition-colors"
            >
              Join the Empire
            </button>

            <p className="text-sm text-[#9CA3AF] text-center">
              Already enlisted?{" "}
              <Link
                to="/login"
                className="text-[#D32F2F] hover:text-white underline"
              >
                Access Imperial Systems.
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer theme="dark" autoClose={5000} />
    </div>
  );
}

export default Register;
