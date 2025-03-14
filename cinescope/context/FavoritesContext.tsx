import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import { Movie, FavoritesContextTypeProp } from "@/interfaces";
import { AuthContext } from "@/context/AuthContext";

export const FavoritesContext = createContext<FavoritesContextTypeProp>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

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
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId: number) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

