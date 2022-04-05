import styles from '../../mcss/Crypto.module.css';
export function Pagination({ cryptoPerPage, allCrypto, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allCrypto / cryptoPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.ul_container}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={styles.li_elem}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}
