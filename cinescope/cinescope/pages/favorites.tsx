import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { FavoritesContext } from "@/context/FavoritesContext";


const Favorites: React.FC = () => {
  const { favorites } = useContext(FavoritesContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent hydration errors

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-600 to-pink-500 dark:from-gray-900 dark:to-gray-800 text-white transition-all">
      <Navbar />

      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gold-400 mb-4">Your Favorite Movies</h2>
        
        {favorites.length === 0 ? (
          <p className="text-lg text-gray-300">No favorites yet. Go add some!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
