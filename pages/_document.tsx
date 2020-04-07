import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
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
          <meta
            property="og:image"
            content="https://did0es.me/static/ogp.jpg"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Sarpanch&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
