import React from 'react';
import Head from 'next/head';
import A001 from '@/components/archive/A001';

const Page001: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta property="og:image" content="/og-images/001.png" />
      </Head>
      <A001 />
    </>
  );
};

export default Page001;
