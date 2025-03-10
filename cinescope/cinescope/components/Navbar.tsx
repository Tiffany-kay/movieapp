import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-purple-700 dark:bg-gray-900 text-white p-4 shadow-md transition-all">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          CineScope
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gold">Home</Link>
          <Link href="/favorites" className="hover:text-gold">Favorites</Link>
          <Link href="/profile" className="hover:text-gold">Profile</Link>
        </div>

        {/* Right Section: Theme Toggle & Login Button */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login">
            <button className="bg-gold text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
