import A002 from '@/components/archive/A002';
import { Meta, Page } from '@/components/common/Page';
import { Layout } from '@/components/common/Layout';
import { NextPage } from 'next';
import { SITE_NAME } from '@/configs/constants';

const Page002: NextPage = () => {
  const meta: Meta = {
    title: `${SITE_NAME} - 002`,
    image: '/og-images/002.png',
  };

  return (
    <Page meta={meta}>
      <Layout>
        <A002 />
      </Layout>
    </Page>
  );
};

export default Page002;
