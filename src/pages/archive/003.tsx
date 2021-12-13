import A003 from '@/components/archive/A003';
import Head from 'next/head';
import React from 'react';

const Page003: React.FC = () => {
  return (
    <>
      <Head>
        <meta property="og:description" content="Maraviglia" />
        <meta property="og:image" content="/og-images/003.png" />
      </Head>
      <A003 />
    </>
  );
};

export default Page003;
