import A001 from '@/components/archive/A001';
import { Meta, Page } from '@/components/common/Page';
import { Layout } from '@/components/common/Layout';
import { NextPage } from 'next';
import { SITE_NAME } from '@/configs/constants';

const Page001: NextPage = () => {
  const meta: Meta = {
    title: `${SITE_NAME} - 001`,
    image: '/og-images/001.png',
  };

  return (
    <Page meta={meta}>
      <Layout>
        <A001 />
      </Layout>
    </Page>
  );
};

export default Page001;
