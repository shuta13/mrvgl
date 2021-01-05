import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const A004 = dynamic(() => import("../../components/archive/A004"), {
  ssr: false,
});

const _004: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta property="og:image" content="/og-images/004.png" />
      </Head>
      <A004 />
    </>
  );
};

export default _004;
