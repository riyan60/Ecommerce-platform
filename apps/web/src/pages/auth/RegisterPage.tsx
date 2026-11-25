
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (response) => {
      login(response.data.accessToken);
      navigate("/");
    },

    onError: () => {
      setError("Registration failed. This email may already be registered.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    registerMutation.mutate({ name, email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <Link to="/" className="text-3xl font-bold tracking-widest">
          NEXORA
        </Link>

        <h1 className="mt-8 text-3xl font-bold">Create account</h1>

        <p className="mt-2 text-gray-500">
          Join NEXORA and start shopping.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

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
              placeholder="Create a password"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
