import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Navbar />
        <Component {...pageProps} />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default MyApp;
