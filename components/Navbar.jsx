"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

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
  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10 dark:text-accent dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
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
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5"
      >
        <Image
          src={user.photo}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
        <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
            onClick={() => { onLogout(); setOpen(false); }}
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
  const { user, logout } = useAuth();
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

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-surface-dark/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" />
            </svg>
          </div>
          <span className="font-display text-xl font-bold text-primary dark:text-white">
            StudyNook
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActiveLink(link.href, pathname) ? "page" : undefined}
              className={navLinkClass(link.href, pathname)}
            >
              {link.label}
            </Link>
          ))}
          {user && privateLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActiveLink(link.href, pathname) ? "page" : undefined}
              className={navLinkClass(link.href, pathname)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {user ? (
            <ProfileDropdown user={user} onLogout={logout} />
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

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-primary dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-gray-100 px-4 py-4 md:hidden dark:border-gray-800">
          <div className="flex flex-col gap-3">
            {[...navLinks, ...(user ? privateLinks : [])].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActiveLink(link.href, pathname) ? "page" : undefined}
                className={navLinkClass(link.href, pathname)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-danger hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="btn-secondary flex-1 text-center" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="btn-primary flex-1 text-center" onClick={() => setMobileOpen(false)}>
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
