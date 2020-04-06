import Head from "next/head";
import Link from "next/link";

const works = 10;

const Home = () => {
  const ids = [];
  for (let i = 1; i < works + 1; i++) {
    if (i < 10) {
      ids.push(`00${i}`);
    } else if (i >= 10 && i < 100) {
      ids.push(`0${i}`);
    } else {
      ids.push(`${i}`);
    }
  }
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

      <ul>
        {
          ids.map((id) => (
            <li key={id}>
              <Link href="/works/[id]" as={`works/${id}`}>
                <a>works - { id }</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default Home;