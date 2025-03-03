import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        {/* ✅ PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* ✅ App Icons */}
        <link rel="icon" href="/icon512_rounded.png" />
        <link rel="apple-touch-icon" href="/icon512_maskable.png" />

        {/* ✅ Theme & Background Colors */}
        <meta name="theme-color" content="#8936FF" />
        <meta name="background-color" content="#2EC6FE" />

        {/* ✅ SEO Meta Tags */}
        <meta name="description" content="Cinescope - Your ultimate movie recommender!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
