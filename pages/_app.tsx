import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SocketContext, socket } from "../context/socket";
import Head from "next/head";
import Layout from "../components/layout";
import { UserProvider } from "../context/userProvider";
import Script from "next/script";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Semanteilay</title>
        <meta property="og:title" content="Semanteilay" key="title" />
        <meta property="description" content="Play Semantle with your so-called friends" />
        <meta property="og:description" content="Play Semantle with your so-called friends" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://semanteilay.fly.dev/favicon.jpg" />
        <meta property="og:url" content="https://semanteilay.fly.dev/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="Play Semantle with your so-called friends" />
        <meta property="twitter:title" content="Semanteilay" />
        <meta property="twitter:image" content="https://semanteilay.fly.dev/favicon.jpg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4S57ZE48X1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4S57ZE48X1');
        `}
      </Script>
      <SocketContext.Provider value={socket}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </UserProvider>
      </SocketContext.Provider>
    </CacheProvider>
  );
}

export default MyApp;
