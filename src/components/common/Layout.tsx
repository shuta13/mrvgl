import styles from './Layout.module.scss';
import { useGetPathName } from '@/utils/hooks/useGetPathName';
import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import archivesData from '@/store/data/archives.json';
import Overlay from './Overlay';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const [isCaptureMode, setIsCaptureMode] = useState(false);

  const pathData = useGetPathName();
  const isArchives = pathData.name.includes('archive');
  const isCapture = pathData.name.includes('capture');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 's') {
      setIsCaptureMode(!isCaptureMode);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e));
    return () => window.removeEventListener('keydown', (e) => handleKeyDown(e));
  });

  return (
    <div className="container">
      {children}
      {!isCapture && !isCaptureMode && (
        <>
          {isArchives ? (
            <Footer pathData={pathData} archivesData={archivesData} />
          ) : (
            <div className={styles.wrapper}>
              <a
                className={styles.link}
                href="https://github.com/shuta13"
                target="_blank"
                rel="noreferrer"
              >
                AUTHOR
              </a>
            </div>
          )}
        </>
      )}
      {isArchives && (
        <>
          {archivesData.map(
            (archive) =>
              archive.desc === '' &&
              pathData.id === archive.id &&
              process.env.NODE_ENV === 'production' && <Overlay />
          )}
        </>
      )}
      {!isCapture && !isCaptureMode && <Header />}
    </div>
  );
};
