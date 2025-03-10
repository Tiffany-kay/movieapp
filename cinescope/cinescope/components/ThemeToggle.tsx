"use client"; // Ensure this runs only on the client side
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage and set initial theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (theme === null) return null; // Avoid rendering before theme is set

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gold text-black dark:bg-gray-800 dark:text-gold"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
