
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/products/:id"
        element={<ProductDetailsPage />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
