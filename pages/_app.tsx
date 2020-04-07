import "../assets/style/global.scss";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { useGetPathName } from "../utils/hooks/useGetPathName";

const MyApp: NextPage<AppProps> = ({
  Component,
  pageProps
}) => {
  const pathData = useGetPathName();
  return (
    <>
      <Component {...pageProps} />
      <Header />
      {
        pathData.name?.includes("works") && <Footer pathData={pathData} />
      }
    </>
  );
};

export default MyApp;