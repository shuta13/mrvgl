import '../assets/style/global.scss';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useGetPathName } from '../shared/hooks/useGetPathName';
import archivesData from '../store/data/archives.json';
import Overlay from '../components/common/Overlay';
import { useEffect, useState } from 'react';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const pathData = useGetPathName();
  const isArchives = pathData.name.includes('archive');
  const isCapture = pathData.name.includes('capture');
  const titleId = `- ${pathData.id}`;

  const [isCaptureMode, setIsCaptureMode] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 's') {
      setIsCaptureMode(!isCaptureMode);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e));
    return () => window.removeEventListener('keydown', (e) => handleKeyDown(e));
  });

  return (
    <>
      <Head>
        {isArchives ? (
          <title>Maraviglia {titleId}</title>
        ) : (
          <>
            <title>Maraviglia</title>
            <meta property="og:image" content="/og-images/001.png" />
          </>
        )}
        <meta name="description" content="Maraviglia" />
        <meta property="og:site_name" content="Maraviglia" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maraviglia.now.sh" />
        <meta property="og:title" content="Maraviglia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content="Maraviglia" />
      </Head>
      <Component {...pageProps} />
      {!isCapture && !isCaptureMode && (
        <>
          {isArchives ? (
            <Footer pathData={pathData} archivesData={archivesData} />
          ) : (
            <div className="ExternalLinkWrap">
              <a
                className="ExternalLink"
                href="https://did0es.me"
                target="_blank"
                rel="noopener"
              >
                Author
              </a>
            </div>
          )}
        </>
      )}
      {isArchives && (
        <>
          {archivesData.map(
            (archive) =>
              archive.desc === '' &&
              pathData.id === archive.id &&
              process.env.NODE_ENV === 'production' && <Overlay />
          )}
        </>
      )}
      {!isCapture && !isCaptureMode && <Header />}
    </>
  );
};

export default MyApp;
