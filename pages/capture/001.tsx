import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const A001 = dynamic(() => import("../../components/partials/archive/A001"), {
  ssr: false,
});

const _001: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta
          property="og:image"
          content="https://maraviglia.now.sh/og/001.png"
        />
      </Head>
      <A001 />
    </>
  );
};

export default _001;
