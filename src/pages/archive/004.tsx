import React from 'react';
import Head from 'next/head';
import A004 from '@/components/archive/A004';

const Page004: React.FC = () => {
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

export default Page004;
