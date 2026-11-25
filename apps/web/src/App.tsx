
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/products/:id"
        element={<ProductDetailsPage />}
      />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;