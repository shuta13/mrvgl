import React from 'react';
import Link from 'next/link';

import archives from '@/store/data/archives.json';
import { Meta, Page } from '@/components/common/Page';
import { Layout } from '@/components/common/Layout';

const ids: Array<string> = [];
for (let i = 0; i < archives.length; i++) {
  if (i > 0 && i < 10) {
    ids.push(`00${i}`);
  } else if (i >= 10 && i < 100) {
    ids.push(`0${i}`);
  } else if (i >= 100) {
    ids.push(`${i}`);
  }
}

const Home: React.FC = () => {
  const meta: Meta = {};

  return (
    <Page meta={meta}>
      <Layout>
        <ul>
          {ids.map((id) => (
            <li key={id} className="ArchivesLinkWrapper">
              <Link href={`/archive/${id}`}>
                <a className="ArchivesLink">{id}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </Page>
  );
};

export default Home;
