// import { useContext, useState } from "react";
// import { Movie, MovieCardProps } from "@/interfaces";
// import { FavoritesContext } from "@/context/FavoritesContext";
// import WatchTrailerButton from "@/components/WatchTrailerButton";


// const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
//   const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
//   const [isHovered, setIsHovered] = useState(false);
//   const isFavorite = favorites.some((fav) => fav.id === movie.id);

//   // Ensure rating is always a valid number or fallback to "N/A"
//   const ratingDisplay =
//     typeof movie.rating === "number" ? movie.rating.toFixed(1) : "N/A";

//   return (
//     <div
//       className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/*  Handle missing poster with a default image */}
//       <img
//         src={movie.poster || "/default-movie.png"}
//         alt={movie.title || "Unknown Movie"}
//         className="w-full h-64 object-cover"
//       />

//       {isHovered && (
//         <div className="absolute inset-0 bg-black bg-opacity-80 p-4 flex flex-col justify-center items-center text-white transition-opacity">
//           <h2 className="text-lg font-bold">{movie.title || "Untitled Movie"}</h2>
//           <p className="text-sm">{movie.releaseDate || "Release date unknown"}</p>
//           <p className="text-gold font-semibold">⭐ {ratingDisplay}</p>
//           <div className="flex gap-2 mt-2">
//             <button
//               className={`px-3 py-1 rounded ${isFavorite ? "bg-red-500" : "bg-green-500"} text-white`}
//               onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie))}
//             >
//               {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//             </button>
//             <WatchTrailerButton movieId={movie.id} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieCard;

import { useContext, useState } from "react";
import { Movie } from "@/interfaces";
import { FavoritesContext } from "@/context/FavoritesContext";
import WatchTrailerButton from "@/components/WatchTrailerButton";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [isHovered, setIsHovered] = useState(false);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={movie.poster || "/default-movie.png"}
        alt={movie.title || "Unknown Movie"}
        width={500} 
        height={750}
        className="w-full h-64 object-cover"
      />

      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 p-4 flex flex-col justify-center items-center text-white">
          <h2 className="text-lg font-bold">{movie.title || "Untitled Movie"}</h2>
          <p className="text-sm">{movie.releaseDate || "Release date unknown"}</p>
          <div className="flex gap-2 mt-2">
            <button
              className={`px-3 py-1 rounded ${isFavorite ? "bg-red-500" : "bg-green-500"} text-white`}
              onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie))}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <WatchTrailerButton movieId={movie.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
