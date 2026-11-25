
import {
  ArrowRight,
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  Headphones,
  Smartphone,
  Laptop,
  Watch,
  Camera,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./services/product.service";
import ProductCard from "./components/products/ProductCard";
import { Link } from "react-router-dom";

const categories = [
  { name: "Smartphones", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Audio", icon: Headphones },
  { name: "Wearables", icon: Watch },
  { name: "Cameras", icon: Camera },
];

function App() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <div className="min-h-screen bg-white text-[#171717]">
      {/* Announcement */}
      <div className="bg-[#171717] px-4 py-2 text-center text-xs text-white">
        Free shipping on orders above ₹999
        <span className="ml-2 text-blue-300">Shop now →</span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden">
              <Menu size={22} />
            </button>

            <a href="/" className="text-2xl font-black tracking-tight">
              NEXORA<span className="text-blue-600">.</span>
            </a>
          </div>

          <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
            <a href="#" className="hover:text-blue-600">Home</a>
            <Link to="/products" className="hover:text-blue-600">Shop</Link>
            <a href="#categories" className="hover:text-blue-600">Categories</a>
            <a href="#about" className="hover:text-blue-600">About</a>
          </nav>

          <div className="flex items-center gap-5">
            <button aria-label="Search">
              <Search size={21} />
            </button>
            <button aria-label="Account" className="hidden sm:block">
              <UserRound size={21} />
            </button>
            <button aria-label="Shopping cart" className="relative">
              <ShoppingBag size={21} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24 lg:px-8">
          <div className="max-w-xl">
            <span className="mb-7 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold tracking-wider text-blue-700">
              THE FUTURE OF SHOPPING
            </span>

            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Technology
              <br />
              that moves
              <br />
              <span className="text-blue-600">you forward.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-gray-500">
              Discover thoughtfully selected technology,
              premium electronics and everyday essentials
              designed to elevate your life.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-3 rounded-full bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Explore collection
                <ArrowRight size={17} />
              </a>

              <a
                href="#categories"
                className="rounded-full border border-gray-200 px-7 py-4 text-sm font-semibold transition hover:border-black"
              >
                Browse categories
              </a>
            </div>

            <div className="mt-14 flex items-center gap-8 border-t border-gray-100 pt-7">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="mt-1 text-xs text-gray-500">Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold">10k+</p>
                <p className="mt-1 text-xs text-gray-500">Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="mt-1 text-xs text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[40px] bg-blue-100/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-4xl bg-[#eef2f7]">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200"
                alt="Premium smartphone"
                className="h-105 w-full object-cover md:h-137.5"
              />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-white/90 p-5 backdrop-blur">
                <div>
                  <p className="text-xs text-gray-500">FEATURED COLLECTION</p>
                  <p className="mt-1 font-semibold">Discover something new</p>
                </div>
                <ArrowUpRight className="text-blue-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="border-y border-gray-100 bg-[#fafafa] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest text-blue-600">
                  EXPLORE
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Shop by category
                </h2>
              </div>
              <a href="#products" className="hidden text-sm font-semibold md:flex">
                View all <ArrowRight size={16} className="ml-2" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {categories.map(({ name, icon: Icon }) => (
                <a
                  key={name}
                  href="#products"
                  className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <Icon
                    size={30}
                    strokeWidth={1.5}
                    className="transition group-hover:text-blue-600"
                  />
                  <span className="mt-5 text-sm font-semibold">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-600">
                HANDPICKED FOR YOU
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Trending products
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Explore technology worth experiencing.
              </p>
            </div>

            <a
              href="#products"
              className="hidden items-center gap-2 text-sm font-semibold md:flex"
            >
              View collection <ArrowUpRight size={17} />
            </a>
          </div>


          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              <p className="col-span-full py-10 text-center text-gray-500">
                Loading products...
              </p>
            ) : isError ? (
              <p className="col-span-full py-10 text-center text-red-500">
                Unable to load products. Please try again.
              </p>
            ) : products.length === 0 ? (
              <p className="col-span-full py-10 text-center text-gray-500">
                No products available yet.
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

        </section>

        {/* Promotional banner */}
        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="relative overflow-hidden rounded-[30px] bg-[#151b2b] px-8 py-16 text-white md:px-16">
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-semibold tracking-widest text-blue-300">
                A BETTER WAY TO SHOP
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
                Your next favourite gadget is waiting.
              </h2>
              <a
                href="#products"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-blue-100"
              >
                Start exploring <ArrowRight size={17} />
              </a>
            </div>
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute -right-5 -top-16 h-80 w-80 rounded-full border border-white/10" />
          </div>
        </section>

        {/* Benefits */}
        <section id="about" className="border-t border-gray-100 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-3 lg:px-8">
            <div className="flex gap-4">
              <Truck className="text-blue-600" size={27} />
              <div>
                <h3 className="font-semibold">Fast delivery</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Reliable delivery right to your doorstep.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <ShieldCheck className="text-blue-600" size={27} />
              <div>
                <h3 className="font-semibold">Secure payments</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Secure checkout and protected transactions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <RefreshCcw className="text-blue-600" size={27} />
              <div>
                <h3 className="font-semibold">Easy returns</h3>
                <p className="mt-2 text-sm text-gray-500">
                  A simple and convenient return experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#171717] px-5 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
          <div>
            <a href="/" className="text-2xl font-black">
              NEXORA<span className="text-blue-500">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
              Technology, thoughtfully selected.
              Discover your next favourite device.
            </p>
          </div>

          <div className="text-sm text-gray-400">
            <p>Shop</p>
            <p className="mt-4">About us</p>
            <p className="mt-4">Contact</p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-gray-500">
          © 2026 NEXORA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;