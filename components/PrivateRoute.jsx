// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import LoadingSpinner from "@/components/LoadingSpinner";

// export default function PrivateRoute({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!loading && !user) {
//       sessionStorage.setItem("redirect_after_login", pathname);
//       router.push("/login");
//     }
//   }, [user, loading, router, pathname]);

//   if (loading) {
//     return <LoadingSpinner fullPage size="lg" />;
//   }

//   if (!user) {
//     return <LoadingSpinner fullPage size="lg" />;
//   }

//   return children;
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function PrivateRoute({ children }) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return children;
}
