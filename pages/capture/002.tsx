import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const A002 = dynamic(() => import("../../components/archive/A002"), {
  ssr: false,
});

const _002: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta
          property="og:image"
          content="https://maraviglia.now.sh/og/002.png"
        />
      </Head>
      <A002 />
    </>
  );
};

export default _002;
