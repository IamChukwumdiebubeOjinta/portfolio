"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide header/footer on /login and any /login/* subroutes
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");
  // Guard for /admin and /admin/* routes
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  // During SSR and before hydration, render everything to prevent mismatch
  if (!mounted) {
    return (
      <>
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {!isLogin && !isAdminRoute && <Header />}
      <div className={isLogin || isAdminRoute ? "" : "pt-16"}>{children}</div>
      {!isLogin && !isAdminRoute && <Footer />}
    </>
  );
} 