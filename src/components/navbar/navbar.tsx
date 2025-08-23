"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Squash as Hamburger } from "hamburger-react";
import clsx from "clsx";
import { pathTo } from "@/utils/routes";

const PORTFOLIO_NAV_NAME = "Portfolio";

const NAV_LINKS = [
  {
    href: pathTo.home,
    name: "Home",
  },
  {
    href: "#",
    name: PORTFOLIO_NAV_NAME,
  },
  {
    href: pathTo.about,
    name: "About Us",
  },
];

const PORTFOLIO_NAV_LINKS = [
  {
    href: pathTo.portfolioTravelAndHospitality,
    name: "Travel & Hospitality",
  },
  {
    href: pathTo.portfolioStorytelling,
    name: "Storytelling",
  },
  {
    href: pathTo.portfolioCampaigns,
    name: "Campaigns",
  },
  {
    href: pathTo.portfolioDevelopment,
    name: "Development",
  },
  {
    href: pathTo.portfolioProduction,
    name: "Production",
  },
  {
    href: pathTo.portfolioDesign,
    name: "Design",
  },
];

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-[var(--background)] sticky top-0 z-50 md:h-[72px] h-16">
      <div className="mx-4 md:mx-36 h-full">
        <div className="flex h-full justify-between items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-[var(--color-primary)]"
            >
              MJG Firm
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex min-w-0 space-x-2">
              {NAV_LINKS.map(({ name, href }) => (
                <div key={href} className="relative group/navbar-item">
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      mounted &&
                        (pathname == href ||
                          (name == PORTFOLIO_NAV_NAME &&
                            pathname.includes("/portfolio")))
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-secondary)]",
                      "hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-xl uppercase font-medium transition-colors group-hover/navbar-item:bg-[#e9e1d8]"
                    )}
                  >
                    {name}
                  </Link>

                  {/* Portfolio drop down menu */}
                  {name == PORTFOLIO_NAV_NAME && (
                    <div className="absolute top-full left-0 mt-[12px] w-60 bg-[#e9e1d8] rounded-md shadow-lg opacity-0 invisible group-hover/navbar-item:opacity-100 group-hover/navbar-item:visible uppercase transition-all duration-200 z-50">
                      <div className="py-2">
                        {PORTFOLIO_NAV_LINKS.map(
                          ({ name, href: portfolioHref }) => (
                            <Link
                              key={portfolioHref}
                              href={portfolioHref}
                              className={clsx(
                                mounted && pathname == portfolioHref
                                  ? "text-[var(--color-primary)]"
                                  : "text-[var(--color-secondary)]",
                                "block px-4 py-2 text-base hover:text-[var(--color-primary)] transition-colors font-medium"
                              )}
                            >
                              {name}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              size={24}
              color="#5f4738"
              label="Show menu"
              easing="ease-in"
              rounded
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed w-full">
          <div className="absolute left-0 right-0 bg-[var(--background)]">
            {NAV_LINKS.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xl text-[var(--color-secondary)] px-7.5 py-4 cursor-pointer border-b border-[var(--color-secondary)] block transition-none"
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-1">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
