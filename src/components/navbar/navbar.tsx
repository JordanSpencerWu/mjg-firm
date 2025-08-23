"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { pathTo } from "@/utils/routes";

const NAV_LINKS = [
  {
    href: pathTo.home,
    name: "Home",
  },
  {
    href: pathTo.portfolio,
    name: "Portfolio",
  },
  {
    href: pathTo.about,
    name: "About Us",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[var(--background)] sticky top-0 z-50 md:h-[72px] h-16">
      <div className="mx-4 md:mx-36 h-full">
        <div className="flex h-full justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              MJG Firm
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex min-w-0 space-x-2">
              {NAV_LINKS.map(({ name, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    pathname == href
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)]",
                    "hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-xl uppercase font-medium transition-colors"
                  )}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900 p-2">
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
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
