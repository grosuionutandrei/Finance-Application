import styles from '../mcss/Footer.module.css';
export function Footer() {
  return (
    <footer className={styles.footer_container}>
      <ul className={styles.links}>
        <li>
          <p>Powered by</p>
        </li>
        <li>
          <a href="https://finance.yahoo.com/">Yahoo Finance</a>
          <span> &amp;</span>
          <a href="https://finnhub.io/"> Finnhub </a>
        </li>
      </ul>
    </footer>
  );
}
