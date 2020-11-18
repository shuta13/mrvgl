import Head from "next/head";
import React from "react";
import A003 from "../../components/archive/A003";

const _003: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta
          property="og:image"
          content="https://maraviglia.now.sh/og/003.png"
        />
      </Head>
      <A003 />
    </>
  );
};

export default _003;
