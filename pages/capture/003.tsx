import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const A003 = dynamic(() => import("../../components/archive/A003"), {
  ssr: false,
});

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
