import { FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="flex h-24 flex-col items-center justify-center bg-[#5f4738] text-base text-white">
      <a
        className="mb-2 cursor-pointer text-[var(--color-secondary)] transition-all duration-200 hover:scale-110 hover:text-white/90"
        href="https://www.instagram.com/themjgprfirm"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FaInstagram size={32} />
      </a>
      <small>
        &copy; {new Date().getFullYear()} MJG PR Firm. All Rights Reserved
      </small>
    </footer>
  )
}
