import React from 'react';
import Head from 'next/head';
import A005 from '@/components/archive/A005';

const Page005: React.FC = () => {
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

export default Page005;
