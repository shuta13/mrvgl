import { Layout } from '@/components/common/Layout';
import { Meta, Page } from '@/components/common/Page';
import { NextPage } from 'next';
import _Error from '../components/_error';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  const meta: Meta = {
    title: 'Unknown',
    image: '/og-images/unknown.png',
  };

  return (
    <Page meta={meta}>
      <Layout>
        <_Error statusCode={statusCode} />
      </Layout>
    </Page>
  );
};

Error.getInitialProps = (context) => {
  const statusCode = context.res
    ? context.res.statusCode
    : context.err
    ? context.err.statusCode
    : 404;
  return { statusCode };
};

export default Error;
