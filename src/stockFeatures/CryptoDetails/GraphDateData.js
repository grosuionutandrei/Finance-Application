import style from '../../mcss/CryptoDetails.module.css';

export function ChangeDateForm() {
  return (
    <form className={style.graph_date}>
      <label htmlFor="from">From</label>
      <input type="date" name="from" id="from" />
      <label htmlFor="to">To</label>
      <input type="date" name="to" id="to" />
      <button type="submit">Search</button>
    </form>
  );
}
