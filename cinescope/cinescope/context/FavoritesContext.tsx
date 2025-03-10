import { createContext, useState, useEffect, ReactNode } from "react";
import { Movie, FavoritesContextTypeProp } from "@/interfaces";

export const FavoritesContext = createContext<FavoritesContextTypeProp>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId: number) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

