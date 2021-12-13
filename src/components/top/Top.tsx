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
            <Link href={`/archive/${archive.id}`} key={archive.id}>
              <li className={styles.list}>
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
                <span
                  className={
                    parseInt(archive.id) % 2 === 1
                      ? styles.number_right
                      : styles.number_left
                  }
                >
                  {archive.id}
                </span>
              </li>
            </Link>
          ))}
      </div>
    </ul>
  );
};
