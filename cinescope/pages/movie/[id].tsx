import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

// Define TypeScript interface for movie data
interface Movie {
  title: string;
  poster: string;
  description: string;
  releaseDate: string;
}

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get movie ID from URL

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`); // Replace with actual API URL
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data: Movie = await res.json();
        setMovie(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {movie ? (
        <>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {/* Use next/image instead of img */}
          <Image
            src={movie.poster}
            alt={movie.title}
            width={256} // Adjust width
            height={384} // Adjust height
            className="rounded-lg my-4"
            priority // Improve LCP
          />
          <p className="text-lg">{movie.description}</p>
          <p className="mt-2">Release Date: {movie.releaseDate}</p>
        </>
      ) : (
        <p className="text-gray-400">Movie not found.</p>
      )}
    </div>
  );
};

export default MovieDetail;
