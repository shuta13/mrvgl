import React from 'react';
import Link from 'next/link';
import { SITE_NAME } from '@/configs/constants';

type Props = {
  isDark?: boolean;
};

export const Header: React.FC<Props> = ({ isDark }) => {
  return (
    <Link href="/">
      <a className="HeaderTitle">{SITE_NAME}</a>
    </Link>
  );
};
