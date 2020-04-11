import "../assets/style/global.scss";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { useGetPathName } from "../utils/hooks/useGetPathName";
import archivesData from "../utils/data/archives.json";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const pathData = useGetPathName();
  const isArchives = pathData.name.includes("archives");
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
      <Header />
      {isArchives && <Footer pathData={pathData} archivesData={archivesData} />}
    </>
  );
};

export default MyApp;
