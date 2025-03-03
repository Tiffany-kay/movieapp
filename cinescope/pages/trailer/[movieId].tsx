import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define TypeScript interface for movie video data
interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
}

const TrailerPage = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data: { results: Video[] } = await response.json(); // Ensure TypeScript knows results is an array of Video

        const trailer = data.results.find(
          (video: Video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        } else {
          setError("No trailer found for this movie.");
        }
      } catch (err) {
        setError("Failed to fetch the trailer.");
        console.error(err);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : trailerUrl ? (
          <iframe
            width="800"
            height="450"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Loading trailer...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TrailerPage;
