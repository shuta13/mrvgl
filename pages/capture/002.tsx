import Head from "next/head";
import React from "react";
import A002 from "../../components/partials/archive/A002";

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
