"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The "Nasz Izabelin." wordmark. Behaves like a normal link to "/", but when
 * you're already on the home page it smooth-scrolls back to the top instead of
 * doing nothing (Next.js skips navigation when the target route is current).
 */
export function BrandLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className={className}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      {children}
    </Link>
  );
}
