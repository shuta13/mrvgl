import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_NAME, SITE_URL, TWITTER_USER_NAME } from '@/configs/constants';

export type Meta = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

type Props = {
  meta: Meta;
  children: React.ReactNode;
};

export const Page: React.VFC<Props> = ({ meta, children }) => {
  const router = useRouter();

  const title = meta.title || SITE_NAME;
  const description = meta.description || SITE_NAME;
  const url = meta.url || `${SITE_URL}${router.asPath}`;
  const image = meta.image || '/og-images/001.png';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" /> */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={image.startsWith('https://') ? image : `${SITE_URL}${image}`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almendra+Display&family=Chakra+Petch:wght@600&family=Share+Tech+Mono&family=Sarpanch&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="noindex" />
      </Head>
      {children}
    </>
  );
};
