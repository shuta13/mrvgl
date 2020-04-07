import "../assets/style/global.scss";
import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Header } from "../components/common/Header";

const App: NextPage<AppProps> = ({
  Component,
  pageProps
}) => {
  return (
    <>
      <Head>
        <title>Photon</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Photon" />
        <meta property="og:site_name" content="Photon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://photon.did0es.me" />
        <meta property="og:title" content="Photon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content="Photon" />
        <meta property="og:image" content="https://did0es.me/static/ogp.jpg" />
      </Head>

      <Component {...pageProps} />
      <Header />
    </>
  );
};

export default App;