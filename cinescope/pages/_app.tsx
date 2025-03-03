import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { FavoritesProvider } from "@/context/FavoritesContext"; // Import FavoritesProvider

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
    }
  }, []);

  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  );
}
