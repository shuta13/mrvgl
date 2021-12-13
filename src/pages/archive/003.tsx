import A003 from '@/components/archive/A003';
import { Layout } from '@/components/common/Layout';
import { Meta, Page } from '@/components/common/Page';
import { SITE_NAME } from '@/configs/constants';
import { NextPage } from 'next';

const Page003: NextPage = () => {
  const meta: Meta = {
    title: `${SITE_NAME} - 003`,
    image: '/og-images/003.png',
  };

  return (
    <Page meta={meta}>
      <Layout>
        <A003 />
      </Layout>
    </Page>
  );
};

export default Page003;
