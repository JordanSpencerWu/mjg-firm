'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Squash as Hamburger } from 'hamburger-react'
import clsx from 'clsx'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { pathTo } from '@/utils/routes'
import { FaInstagram } from 'react-icons/fa'
import { useLenis } from '@studio-freight/react-lenis'

const HOME_NAV_NAME = 'Home'
const ABOUT_NAV_NAME = 'About Us'
const PORTFOLIO_NAV_NAME = 'Portfolio'

const NAV_LINKS = [
  {
    href: pathTo.home,
    name: HOME_NAV_NAME,
  },
  {
    href: '#',
    name: PORTFOLIO_NAV_NAME,
  },
  {
    href: pathTo.about,
    name: ABOUT_NAV_NAME,
  },
]

const PORTFOLIO_NAV_LINKS = [
  {
    href: pathTo.portfolioTravelAndHospitality,
    name: 'Travel & Hospitality',
  },
  {
    href: pathTo.portfolioStorytelling,
    name: 'Storytelling',
  },
  {
    href: pathTo.portfolioCampaigns,
    name: 'Campaigns',
  },
  {
    href: pathTo.portfolioDevelopment,
    name: 'Development',
  },
  {
    href: pathTo.portfolioProduction,
    name: 'Production',
  },
  {
    href: pathTo.portfolioDesign,
    name: 'Design',
  },
]

export default function Navbar() {
  const [isOpen, setOpen] = useState(false)
  const [isMobilePortfolioOpen, setMobilePortfolioOpen] = useState(false)
  const [isPortfolioHovered, setIsPortfolioHovered] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    setMounted(true)

    if (pathname.includes('/portfolio')) {
      setMobilePortfolioOpen(true)
    }
  }, [])

  useEffect(() => {
    if (isOpen && lenis) {
      lenis.stop()
    } else {
      lenis?.start()
    }

    return () => {
      lenis?.start()
    }
  }, [isOpen, lenis])

  const handleClose = (shouldCloseMobilePortfolioOpen = true) => {
    setOpen(false)

    if (shouldCloseMobilePortfolioOpen) {
      setMobilePortfolioOpen(false)
    }
  }

  return (
    <nav
      className={clsx(
        isOpen && 'h-screen',
        isOpen || (pathname === pathTo.home && 'absolute'),
        pathname === pathTo.home && !isOpen
          ? 'bg-transparent'
          : 'sticky bg-[var(--background)]',
        'top-0 z-50 flex w-full flex-col justify-between',
      )}
    >
      <div>
        <div className="mx-4 h-16 md:mx-36 md:h-[72px]">
          <div className="flex h-full items-center justify-between">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={clsx(
                  pathname === pathTo.home && !isOpen
                    ? 'text-white'
                    : 'text-[var(--color-primary)]',
                  'text-2xl font-bold transition-colors',
                )}
                onClick={() => handleClose()}
              >
                MJG Firm
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex min-w-0 space-x-2">
                {NAV_LINKS.map(({ name, href }) => (
                  <div
                    key={href}
                    className="group/navbar-item relative"
                    onMouseEnter={() =>
                      name === PORTFOLIO_NAV_NAME && setIsPortfolioHovered(true)
                    }
                    onMouseLeave={() =>
                      name === PORTFOLIO_NAV_NAME &&
                      setIsPortfolioHovered(false)
                    }
                  >
                    <Link
                      key={href}
                      href={href}
                      className={clsx(
                        mounted &&
                          (pathname === href ||
                            (name === PORTFOLIO_NAV_NAME &&
                              pathname.includes('/portfolio')))
                          ? pathname === pathTo.home && !isOpen
                            ? 'text-white'
                            : 'text-[var(--color-primary)]'
                          : pathname === pathTo.home && !isOpen
                            ? 'text-white'
                            : 'text-[var(--color-secondary)]',
                        pathname !== pathTo.home &&
                          'group-hover/navbar-item:bg-[#e9e1d8] hover:text-[var(--color-primary)]',
                        'rounded-md px-3 py-2 text-xl font-medium uppercase transition-colors',
                      )}
                    >
                      {name}
                    </Link>

                    {/* Portfolio drop down menu */}
                    {name === PORTFOLIO_NAV_NAME && (
                      <div
                        className={`absolute top-full left-0 z-50 mt-[12px] w-60 rounded-md bg-[#e9e1d8] uppercase shadow-lg transition-all duration-200 ${
                          isPortfolioHovered
                            ? 'visible opacity-100'
                            : 'invisible opacity-0'
                        }`}
                        style={
                          pathname === pathTo.home
                            ? {
                                backdropFilter: 'blur(10px)',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                              }
                            : {}
                        }
                      >
                        <div className="py-2">
                          {PORTFOLIO_NAV_LINKS.map(
                            ({ name, href: portfolioHref }) => (
                              <Link
                                key={portfolioHref}
                                href={portfolioHref}
                                className={clsx(
                                  pathname === pathTo.home
                                    ? 'text-white/70 hover:text-white'
                                    : mounted && pathname === portfolioHref
                                      ? 'text-[var(--color-primary)] hover:text-[var(--color-primary)]'
                                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]',
                                  'block px-4 py-2 text-base font-medium transition-colors',
                                )}
                                onClick={() => {
                                  setIsPortfolioHovered(false)
                                }}
                              >
                                {name}
                              </Link>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="transition-colors md:hidden">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                size={24}
                color={
                  pathname === pathTo.home && !isOpen ? '#f1ece8' : '#5f4738'
                }
                label="Show menu"
                easing="ease-in"
                rounded
              />
            </div>
          </div>
        </div>
        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="animate-fade-in">
            <Link
              href={pathTo.home}
              className={clsx(
                pathname === pathTo.home
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-secondary)]',
                'block cursor-pointer border-b border-[var(--color-secondary)] px-7.5 py-4 text-xl transition-none',
              )}
              onClick={() => handleClose()}
            >
              <span className="flex items-center gap-1">{HOME_NAV_NAME}</span>
            </Link>
            <div
              className={clsx(
                pathname.includes('/portfolio')
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-secondary)]',
                'flex cursor-pointer justify-between border-b border-[var(--color-secondary)] px-7.5 py-4 text-xl transition-none',
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
            <div
              className={clsx(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isMobilePortfolioOpen ? 'max-h-96' : 'max-h-0',
              )}
            >
              {PORTFOLIO_NAV_LINKS.map(({ name, href: portfolioHref }) => (
                <Link
                  key={portfolioHref}
                  href={portfolioHref}
                  className={clsx(
                    pathname === portfolioHref
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-secondary)]',
                    'block cursor-pointer border-b border-[var(--color-secondary)] px-7.5 py-4 text-xl transition-colors',
                  )}
                  onClick={() => handleClose(false)}
                >
                  <span className="ml-7.5 flex items-center gap-1">{name}</span>
                </Link>
              ))}
            </div>
            <Link
              href={pathTo.about}
              className={clsx(
                pathname === pathTo.about
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-secondary)]',
                'block cursor-pointer border-b border-[var(--color-secondary)] px-7.5 py-4 text-xl transition-none',
              )}
              onClick={() => handleClose()}
            >
              <span className="flex items-center gap-1">{ABOUT_NAV_NAME}</span>
            </Link>
          </div>
        )}
      </div>
      {isOpen && (
        <footer className="flex min-h-24 flex-col items-center justify-center text-base">
          <a
            className="mb-2 cursor-pointer text-[var(--color-secondary)] transition-all duration-200 hover:scale-110 hover:text-white/90"
            href="https://www.instagram.com/themjgprfirm"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaInstagram size={32} />
          </a>
          <small className="text-[var(--color-secondary)]">
            &copy; {new Date().getFullYear()} MJG PR Firm. All Rights Reserved
          </small>
        </footer>
      )}
    </nav>
  )
}
