
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">

      <Link to={`/products/${product.id}`}>
        <div className="flex h-64 items-center justify-center bg-gray-50">
          <span className="text-5xl font-semibold text-gray-300">
            {product.name.charAt(0)}
          </span>
        </div>

        <div className="p-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-blue-600">
            {product.category?.name ?? "General"}
          </p>

          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-gray-500">
            {product.description ?? "Explore this product at NEXORA."}
          </p>

          <span className="text-lg font-bold text-gray-900">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
        </div>
      </Link>

    </div>
  );
}
