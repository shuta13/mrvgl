import styles from './Footer.module.scss';

export const Footer: React.FC<{
  pathData: { id: string; index: number; name: string };
  archivesData: Array<{ id: string; createdAt: string; desc: string }>;
}> = ({ pathData, archivesData }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {archivesData[pathData.index].id} -{' '}
        {(archivesData[pathData.index].desc || '?').toUpperCase()}
      </div>
      <div className={styles.info}>
        {archivesData[pathData.index].createdAt}
      </div>
    </div>
  );
};
