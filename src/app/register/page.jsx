"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PageTitle from "@/components/PageTitle";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

function validatePassword(password) {
  const errors = [];
  if (password.length < 6) errors.push("At least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
  return errors;
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { register, googleLogin } = useAuth();
  const router = useRouter();

  const handlePasswordChange = (val) => {
    setForm({ ...form, password: val });
    if (val) {
      setPasswordErrors(validatePassword(val));
    } else {
      setPasswordErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          toast.loading("Creating your account...", {
            toastId: "signup",
          });
        },

        onSuccess: (ctx) => {
          toast.update("signup", {
            render: "Account created successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          // redirect to login/dashboard
          router.push("/login");
        },

        onError: (ctx) => {
          toast.update("signup", {
            render: ctx.error.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        },
      },
    );
  };

  const handleGoogle = () => {
    googleLogin();
    toast.success("Registered with Google!");
    router.push("/");
  };

  return (
    <>
      <PageTitle title="StudyNook – Register" />
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base w-full max-w-md p-8"
        >
          <div className="mb-8 text-center">
            <h1 className="heading-section text-2xl">Create Account</h1>
            <p className="mt-2 text-sm text-muted">
              Join StudyNook and start booking study rooms
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="you@university.edu"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
              {passwordErrors.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {passwordErrors.map((err) => (
                    <li
                      key={err}
                      className="flex items-center gap-1.5 text-xs text-danger"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {err}
                    </li>
                  ))}
                </ul>
              )}
              {form.password && passwordErrors.length === 0 && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-success">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Password meets all requirements
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || passwordErrors.length > 0}
              className="btn-primary w-full"
            >
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>

          <button onClick={handleGoogle} className="btn-secondary w-full">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-accent dark:text-accent"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
