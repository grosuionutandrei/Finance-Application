import style from '../../mcss/CryptoDetails.module.css';
export function EndDate() {
  return (
    <div className={style.end_date}>
      <form className={style.end_date_form}>
        <label htmlFor="endDate">Unfollow</label>
        <input type="date" id="endDate" name="endDate" />
        <button>unfollow</button>
      </form>
    </div>
  );
}
