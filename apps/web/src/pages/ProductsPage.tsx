
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart } from "lucide-react";
import { getProducts } from "../services/product.service";
import ProductCard from "../components/products/ProductCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProductsPage() {

  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category?.name ?? "General")),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category?.name === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low-high") {
      result = [...result].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === "high-low") {
      result = [...result].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          ← Back to Home
        </Link>

        {isAuthenticated && (
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <ShoppingCart size={17} />
            Go to Cart
          </Link>
        )}
      </div>
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-blue-600">
          OUR COLLECTION
        </p>
        <h1 className="mt-3 text-4xl font-semibold">All Products</h1>
        <p className="mt-3 text-gray-500">
          Explore our collection of premium technology.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="relative md:col-span-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Categories" : item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="default">Sort: Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <p className="mb-6 text-sm text-gray-500">
        {filteredProducts.length} products found
      </p>

      {isLoading ? (
        <p className="py-16 text-center text-gray-500">Loading products...</p>
      ) : isError ? (
        <p className="py-16 text-center text-red-500">
          Unable to load products.
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="py-16 text-center text-gray-500">
          No matching products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default ProductsPage;
