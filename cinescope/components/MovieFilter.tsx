// import { Movie } from "../interfaces";

// const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Store API key in .env
// const BASE_URL = "https://api.themoviedb.org/3";

// // Helper function to map movie data
// const mapMovieData = (movie: any): Movie => ({
//   id: movie.id,
//   title: movie.title,
//   poster: movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//     : "/default-movie.png",
//   releaseDate: movie.release_date || "Unknown",
//   overview: movie.overview || "No description available",
//   rating: typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A",
// });

// //  Fetch trending movies
// export const fetchTrendingMovies = async (): Promise<Movie[]> => {
//   try {
//     const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.results.map(mapMovieData);
//   } catch (error) {
//     console.error("❌ Error fetching trending movies:", error);
//     return [];
//   }
// };

// //  Fetch recommended movies (popular movies)
// export const fetchRecommendedMovies = async (): Promise<Movie[]> => {
//   try {
//     const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.results.map(mapMovieData);
//   } catch (error) {
//     console.error("❌ Error fetching recommended movies:", error);
//     return [];
//   }
// };

// //  Fetch movies by search query
// export const fetchMoviesBySearch = async (query: string): Promise<Movie[]> => {
//   try {
//     if (!query.trim()) return [];
//     const response = await fetch(
//       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
//     );
//     const data = await response.json();
//     return data.results.map(mapMovieData);
//   } catch (error) {
//     console.error("❌ Error searching movies:", error);
//     return [];
//   }
// };

// // Fetch movie genres
// export const fetchGenres = async (): Promise<{ id: number; name: string }[]> => {
//   try {
//     const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.genres || [];
//   } catch (error) {
//     console.error("❌ Error fetching genres:", error);
//     return [];
//   }
// };

// //  Fetch movies by filters (genre, year, rating)
// export const fetchMoviesByFilters = async (
//   genre?: number,
//   year?: number,
//   rating?: number
// ): Promise<Movie[]> => {
//   try {
//     let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

//     if (genre) url += `&with_genres=${genre}`;
//     if (year) url += `&primary_release_year=${year}`;
//     if (rating) url += `&vote_average.gte=${rating}`
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.results.map(mapMovieData);
//   } catch (error) {
//     console.error("❌ Error fetching movies by filters:", error);
//     return [];
//   }
// };

import React from "react";

interface MovieFilterProps {
  genres: { id: number; name: string }[];
  selectedGenre: number | null;
  setSelectedGenre: (genreId: number | null) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2">Filter by Genre:</label>
      <select
        className="w-full p-2 border rounded"
        value={selectedGenre ?? ""}
        onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieFilter;
