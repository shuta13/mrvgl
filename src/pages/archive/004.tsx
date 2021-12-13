import React from 'react';
import A004 from '@/components/archive/A004';
import { Meta, Page } from '@/components/common/Page';
import { SITE_NAME } from '@/configs/constants';
import { Layout } from '@/components/common/Layout';

const Page004: React.FC = () => {
  const meta: Meta = {
    title: `${SITE_NAME} - 001`,
    image: '/og-images/004.png',
  };

  return (
    <Page meta={meta}>
      <Layout>
        <A004 />
      </Layout>
    </Page>
  );
};

export default Page004;
