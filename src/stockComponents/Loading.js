import styles from '../mcss/Loading.module.css';
export function Loading() {
  return (
    <div className={styles.loader_container}>
      <p className={styles.loading}></p>
    </div>
  );
}
