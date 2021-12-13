import A005 from '@/components/archive/A005';
import { Meta, Page } from '@/components/common/Page';
import { SITE_NAME } from '@/configs/constants';
import { Layout } from '@/components/common/Layout';
import { NextPage } from 'next';

const Page005: NextPage = () => {
  const meta: Meta = {
    title: `${SITE_NAME} - 005`,
    image: '/og-images/005.png',
  };

  return (
    <Page meta={meta}>
      <Layout>
        <A005 />
      </Layout>
    </Page>
  );
};

export default Page005;
