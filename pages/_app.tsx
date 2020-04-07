import "../assets/style/global.scss";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Header } from "../components/common/Header";

const MyApp: NextPage<AppProps> = ({
  Component,
  pageProps
}) => {
  return (
    <>
      <Component {...pageProps} />
      <Header />
    </>
  );
};

export default MyApp;