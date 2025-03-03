import { useRouter } from "next/router";

interface WatchTrailerButtonProps {
  movieId: number;
}

const WatchTrailerButton: React.FC<WatchTrailerButtonProps> = ({ movieId }) => {
  const router = useRouter();

  const handleWatchTrailer = () => {
    router.push(`/trailer/${movieId}`);
  };

  return (
    <button
      onClick={handleWatchTrailer}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Watch Trailer
    </button>
  );
};

export default WatchTrailerButton;
