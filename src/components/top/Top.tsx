import Link from 'next/link';
import archives from '@/store/data/archives.json';
import styles from './Top.module.scss';
import Image from 'next/image';

export const Top: React.FC = () => {
  return (
    <ul>
      <div className={styles.wrapper}>
        {archives
          .filter((archive) => archive.id !== '000')
          .map((archive) => (
            <li key={archive.id} className={styles.list}>
              <Link href={`/archive/${archive.id}`}>
                <a
                  className={
                    parseInt(archive.id) % 2 === 1
                      ? styles.link_right
                      : styles.link_left
                  }
                >
                  <Image
                    src={
                      archive.desc === ''
                        ? '/og-images/unknown.png'
                        : `/og-images/${archive.id}.png`
                    }
                    width={1800}
                    height={945}
                  />
                </a>
              </Link>
            </li>
          ))}
      </div>
    </ul>
  );
};
