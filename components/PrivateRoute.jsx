"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      sessionStorage.setItem("redirect_after_login", pathname);
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <LoadingSpinner fullPage size="lg" />;
  }

  if (!user) {
    return <LoadingSpinner fullPage size="lg" />;
  }

  return children;
}
