"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Squash as Hamburger } from "hamburger-react";
import clsx from "clsx";
import { ChevronUp, ChevronDown } from "lucide-react";
import { pathTo } from "@/utils/routes";

const HOME_NAV_NAME = "Home";
const ABOUT_NAV_NAME = "About Us";
const PORTFOLIO_NAV_NAME = "Portfolio";

const NAV_LINKS = [
  {
    href: pathTo.home,
    name: HOME_NAV_NAME,
  },
  {
    href: "#",
    name: PORTFOLIO_NAV_NAME,
  },
  {
    href: pathTo.about,
    name: ABOUT_NAV_NAME,
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
  const [isMobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const [isPortfolioHovered, setIsPortfolioHovered] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setMobilePortfolioOpen(false);
  };

  return (
    <nav
      className={clsx(
        isOpen && "h-screen absolute",
        "bg-[var(--background)] sticky top-0 z-50"
      )}
    >
      <div className="mx-4 md:mx-36 md:h-[72px] h-16">
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
                <div
                  key={href}
                  className="relative group/navbar-item"
                  onMouseEnter={() =>
                    name === PORTFOLIO_NAV_NAME && setIsPortfolioHovered(true)
                  }
                  onMouseLeave={() =>
                    name === PORTFOLIO_NAV_NAME && setIsPortfolioHovered(false)
                  }
                >
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
                    <div
                      className={`absolute top-full left-0 mt-[12px] w-60 bg-[#e9e1d8] rounded-md shadow-lg uppercase transition-all duration-200 z-50 ${
                        isPortfolioHovered
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
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
                              onClick={() => {
                                setIsPortfolioHovered(false);
                              }}
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
        <div className="">
          <Link
            href={pathTo.home}
            className={clsx(
              pathname == pathTo.home
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-secondary)]",
              "text-xl px-7.5 py-4 cursor-pointer border-b border-[var(--color-secondary)] block transition-none"
            )}
            onClick={handleClose}
          >
            <span className="flex items-center gap-1">{HOME_NAV_NAME}</span>
          </Link>
          <div
            className={clsx(
              pathname.includes("/portfolio")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-secondary)]",
              "text-xl px-7.5 py-4 cursor-pointer border-b border-[var(--color-secondary)] transition-none flex justify-between"
            )}
            onClick={() => setMobilePortfolioOpen((previous) => !previous)}
          >
            <span className="flex items-center gap-1">
              {PORTFOLIO_NAV_NAME}
            </span>
            {isMobilePortfolioOpen ? (
              <ChevronUp size={28} />
            ) : (
              <ChevronDown size={28} />
            )}
          </div>
          {isMobilePortfolioOpen &&
            PORTFOLIO_NAV_LINKS.map(({ name, href: portfolioHref }) => (
              <Link
                key={portfolioHref}
                href={portfolioHref}
                className={clsx(
                  pathname == portfolioHref
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)]",
                  "text-xl px-7.5 py-4 cursor-pointer border-b border-[var(--color-secondary)] block transition-none"
                )}
                onClick={handleClose}
              >
                <span className="ml-7.5 flex items-center gap-1">{name}</span>
              </Link>
            ))}
          <Link
            href={pathTo.about}
            className={clsx(
              pathname == pathTo.about
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-secondary)]",
              "text-xl px-7.5 py-4 cursor-pointer border-b border-[var(--color-secondary)] block transition-none"
            )}
            onClick={handleClose}
          >
            <span className="flex items-center gap-1">{ABOUT_NAV_NAME}</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
