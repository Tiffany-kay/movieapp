import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-600 to-pink-500 dark:from-gray-900 dark:to-gray-800 text-white transition-all">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          {/*  Fixed Image Component */}
          <Image
            src="/profile-avatar.png"
            alt="User Avatar"
            width={96} // 24 * 4 (Tailwind w-24)
            height={96} // 24 * 4
            className="rounded-full mx-auto border-4 border-gold"
          />

          <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
            pru kendi
          </h2>
          <p className="text-gray-600 dark:text-gray-400">kendi@example.com</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
