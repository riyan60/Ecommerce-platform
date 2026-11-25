
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/product.service";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../services/cart.service";
import { useState } from "react";

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [addedToCart, setAddedToCart] = useState(false);

  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: (productId: string) => addToCart(productId, 1),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setAddedToCart(true);
    },

    onError: (error) => {
      console.error("Add to cart error:", error);
      alert("Unable to add product. Please login first.");
    },
  });

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="py-20 text-center">Loading product...</p>;
  }

  if (isError || !product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <Link to="/products" className="mt-5 inline-block text-blue-600">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 lg:px-8">
      <Link
        to="/products"
        className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to products
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex min-h-100 items-center justify-center rounded-3xl bg-gray-50 p-12">
          <span className="text-8xl font-bold text-gray-300">
            {product.name.charAt(0)}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            {product.category?.name ?? "General"}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-bold">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          <div className="my-8 border-t border-gray-100" />

          <h3 className="font-semibold">Product description</h3>

          <p className="mt-3 leading-7 text-gray-500">
            {product.description ?? "No description available."}
          </p>

          {addedToCart ? (
            <Link
              to="/cart"
              className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              <ShoppingBag size={19} />
              Go to Cart →
            </Link>
          ) : (
            <button
              type="button"
              disabled={addToCartMutation.isPending}
              onClick={() => addToCartMutation.mutate(product.id)}
              className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
            >
              <ShoppingBag size={19} />
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </button>
          )}

          <div className="mt-8 space-y-5 border-t border-gray-100 pt-7">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Truck size={20} className="text-blue-600" />
              Fast and reliable delivery
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ShieldCheck size={20} className="text-blue-600" />
              Secure payment experience
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsPage;
