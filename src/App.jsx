import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Product from "./pages/product";
import PreCart from "./pages/precart";
import Cart from "./pages/cart";
import Success from "./pages/success";
import Cancel from "./pages/cancel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/PreCart" element={<PreCart />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Success" element={<Success />} />
        <Route path="/Cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;