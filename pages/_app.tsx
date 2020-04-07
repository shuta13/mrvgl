import "../assets/style/global.scss";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { useGetPathName } from "../utils/hooks/useGetPathName";
import worksData from "../utils/data/worksInfo.json";

const MyApp: NextPage<AppProps> = ({
  Component,
  pageProps
}) => {
  const pathData = useGetPathName();
  const isWorks = pathData.name.includes("works")
  return (
    <>
      {
        isWorks && (
          <Head>
            <title>Photon - { pathData.id }</title>
          </Head>
        )
      }
      <Component {...pageProps} />
      <Header />
      {
        isWorks && <Footer pathData={pathData} worksData={worksData} />
      }
    </>
  );
};

export default MyApp;