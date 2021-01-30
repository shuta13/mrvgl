import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const A005 = dynamic(() => import("../../components/archive/A005"), {
  ssr: false,
});

const _005: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta property="og:image" content="/og-images/005.png" />
      </Head>
      <A005 />
    </>
  );
};

export default _005;
