"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

function isActiveLink(href, pathname) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(href, pathname) {
  const active = isActiveLink(href, pathname);

  return active
    ? "rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary dark:bg-accent/20 dark:text-accent"
    : "rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-accent";
}

function ThemeToggle() {
  const { dark, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-primary dark:text-white"
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
}

function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <span>{user.name}</span>

        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-card-dark">
          <Link
            href="/my-listings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5"
          >
            My Listings
          </Link>

          <Link
            href="/my-bookings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5"
          >
            My Bookings
          </Link>

          <hr className="my-1 border-gray-100 dark:border-gray-700" />

          <button
            onClick={async () => {
              await onLogout();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
  ];

  const privateLinks = [
    { href: "/add-room", label: "Add Room" },
    { href: "/my-listings", label: "My Listings" },
    { href: "/my-bookings", label: "My Bookings" },
  ];

  async function handleLogout() {
    toast.loading("Logging out...", {
      toastId: "logout",
    });

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.update("logout", {
            render: "Logged out successfully!",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });

          router.push("/login");
        },

        onError: (ctx) => {
          toast.update("logout", {
            render: ctx.error.message || "Logout failed. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        },
      },
    });
  }

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-end justify-center gap-2">
          <Image
            src="/logo.png"
            alt="StudyNook Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />

          <span className="text-2xl font-bold text-primary dark:text-white">
            StudyNook
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                isActiveLink(link.href, pathname) ? "page" : undefined
              }
              className={navLinkClass(link.href, pathname)}
            >
              {link.label}
            </Link>
          ))}

          {session &&
            privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  isActiveLink(link.href, pathname) ? "page" : undefined
                }
                className={navLinkClass(link.href, pathname)}
              >
                {link.label}
              </Link>
            ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {isPending ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : session ? (
            <ProfileDropdown user={session.user} onLogout={handleLogout} />
          ) : (
            <>
              <Link href="/login" className="btn-secondary px-4 py-2">
                Login
              </Link>

              <Link href="/register" className="btn-primary px-4 py-2">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-primary dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                className="h-6 w-6"
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
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 px-4 py-4 md:hidden dark:border-gray-800">
          <div className="flex flex-col gap-3">
            {/* Public + Private Links */}
            {[...navLinks, ...(session ? privateLinks : [])].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={
                  isActiveLink(link.href, pathname) ? "page" : undefined
                }
                className={navLinkClass(link.href, pathname)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Authentication */}
            {isPending ? (
              <span className="px-3 py-2 text-sm text-gray-500">
                Loading...
              </span>
            ) : session ? (
              <button
                onClick={async () => {
                  await handleLogout();
                  setMobileOpen(false);
                }}
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-danger hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link
                  href="/login"
                  className="btn-secondary flex-1 text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn-primary flex-1 text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
