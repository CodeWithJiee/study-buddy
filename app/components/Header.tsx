import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-[#162660] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-5">
        {/* Logo */}
        <Logo />

        {/* Navigation / Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-[#162660] transition-colors"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-4 py-2 rounded-md bg-white text-[#162660] font-semibold hover:bg-gray-100 transition-colors"
          >
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
}
