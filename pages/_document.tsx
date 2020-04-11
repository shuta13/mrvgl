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
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Maraviglia" />
          <meta property="og:site_name" content="Maraviglia" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://maraviglia.did0es.me" />
          <meta property="og:title" content="Maraviglia" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:description" content="Maraviglia" />
          <meta
            property="og:image"
            content="https://did0es.me/static/ogp.jpg"
          />
          <link href="https://fonts.googleapis.com/css2?family=Almendra+Display&family=Song+Myung&family=Sarpanch&display=swap" rel="stylesheet"></link>
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
