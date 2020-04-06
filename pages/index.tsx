import Head from "next/head";
import Link from "next/link";

const Home = () => {
  const ids = ["001", "002", "003"];
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

      {
        ids.map((id) => (
          <Link href="/works/[id]" as={`works/${id}`}>
            <a key={id}>works - { id }</a>
          </Link>
        ))
      }
    </>
  );
}

export default Home;