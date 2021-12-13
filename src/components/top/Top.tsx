import Link from 'next/link';
import archives from '@/store/data/archives.json';
import styles from './Top.module.scss';

export const Top: React.FC = () => {
  return (
    <ul>
      {archives
        .filter((archive) => archive.id !== '000')
        .map((archive) => (
          <li key={archive.id} className={styles.wrapper}>
            <Link href={`/archive/${archive.id}`}>
              <a className={styles.link}>{archive.id}</a>
            </Link>
          </li>
        ))}
    </ul>
  );
};
