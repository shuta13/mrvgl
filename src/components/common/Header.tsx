import styles from './Header.module.scss';
import Link from 'next/link';
import { SITE_NAME } from '@/configs/constants';

export const Header: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <a className={styles.title}>{SITE_NAME}</a>
      </Link>
    </div>
  );
};
