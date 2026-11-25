
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cart.service";

function CartPage() {
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) => updateCartItem(itemId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  if (isLoading) {
    return <p className="py-20 text-center">Loading your cart...</p>;
  }

  if (isError || !cart) {
    return <p className="py-20 text-center">Unable to load your cart.</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <ShoppingBag size={60} className="text-gray-300" />
        <h2 className="mt-6 text-2xl font-semibold">
          Your cart is empty
        </h2>
        <p className="mt-2 text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="mt-7 rounded-full bg-black px-8 py-3 text-white hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-12">
      <Link
        to="/products"
        className="flex items-center gap-2 text-sm text-gray-500"
      >
        <ArrowLeft size={17} />
        Continue Shopping
      </Link>

      <h1 className="mb-10 mt-8 text-4xl font-bold">
        Shopping Cart
      </h1>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5"
            >
              <div>
                <h3 className="font-semibold">
                  {item.product.name}
                </h3>

                <p className="mt-2 text-gray-500">
                  ₹{Number(item.product.price).toLocaleString("en-IN")}
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    disabled={item.quantity <= 1 || updateMutation.isPending}
                    onClick={() =>
                      updateMutation.mutate({
                        itemId: item.id,
                        quantity: item.quantity - 1,
                      })
                    }
                    className="rounded-full border p-2 disabled:opacity-40"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    disabled={updateMutation.isPending}
                    onClick={() =>
                      updateMutation.mutate({
                        itemId: item.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="rounded-full border p-2 disabled:opacity-40"
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    type="button"
                    disabled={removeMutation.isPending}
                    onClick={() => removeMutation.mutate(item.id)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              </div>

              <p className="font-bold">
                ₹{(
                  Number(item.product.price) * item.quantity
                ).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 font-bold">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <button
            type="button"
            className="mt-7 w-full rounded-full bg-black py-4 font-semibold text-white hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
