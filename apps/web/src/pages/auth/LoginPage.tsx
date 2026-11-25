
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      login(response.data.accessToken);
      navigate("/");
    },

    onError: () => {
      setError("Invalid email or password.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <Link to="/" className="text-3xl font-bold tracking-widest">
          NEXORA
        </Link>

        <h1 className="mt-8 text-3xl font-bold">Welcome back</h1>

        <p className="mt-2 text-gray-500">
          Login to your NEXORA account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
