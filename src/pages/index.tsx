import { Meta, Page } from '@/components/common/Page';
import { Layout } from '@/components/common/Layout';
import { Top } from '@/components/top/Top';
import { NextPage } from 'next';

const TopPage: NextPage = () => {
  const meta: Meta = {};

  return (
    <Page meta={meta}>
      <Layout>
        <Top />
      </Layout>
    </Page>
  );
};

export default TopPage;
