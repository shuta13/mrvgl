import Head from "next/head";
import React, { useState } from "react";
import A003 from "../../components/partials/archive/A003";
import WebFontLoader from "webfontloader";

const _003: React.FC = () => {
  const [active, setActive] = useState(false);
  WebFontLoader.load({
    google: {
      families: ["Josefin Sans"],
    },
    active: () => setActive(true),
  });

  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta
          property="og:image"
          content="https://maraviglia.now.sh/og/003.png"
        />
      </Head>
      {active && <A003 />}
    </>
  );
};

export default _003;
