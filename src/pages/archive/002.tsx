import Head from 'next/head';
import React from 'react';
import A002 from '@/components/archive/A002';

const Page002: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta property="og:image" content="/og-images/002.png" />
      </Head>
      <A002 />
    </>
  );
};

export default Page002;
