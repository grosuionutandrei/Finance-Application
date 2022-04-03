import styles from '../mcss/Footer.module.css';
export function Footer() {
  return (
    <footer className={styles.footer_container}>
      <ul className={styles.links}>
        <li>
          <a href="https://finance.yahoo.com/">Powered by Yahoo Finance</a>
        </li>
        <li>
          <a href="https://finnhub.io/">Powered by Finnhub</a>
        </li>
      </ul>
    </footer>
  );
}
