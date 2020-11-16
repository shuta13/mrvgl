import "../assets/style/global.scss";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { useGetPathName } from "../utils/hooks/useGetPathName";
import archivesData from "../utils/data/archives.json";
import Overlay from "../components/common/Overlay";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const pathData = useGetPathName();
  const isArchives = pathData.name.includes("archive");
  const isCapture = pathData.name.includes("capture");
  const titleId = `- ${pathData.id}`;

  return (
    <>
      <Head>
        {isArchives ? (
          <title>Maraviglia {titleId}</title>
        ) : (
          <title>Maraviglia</title>
        )}
      </Head>
      <Component {...pageProps} />
      {!isCapture && (
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
      {isArchives ? (
        <>
          {archivesData.map((archive) =>
            archive.desc === "" &&
            pathData.id === archive.id &&
            process.env.ENV !== "dev" ? (
              <Overlay />
            ) : null
          )}
        </>
      ) : null}
      {!isCapture && <Header />}
    </>
  );
};

export default MyApp;
