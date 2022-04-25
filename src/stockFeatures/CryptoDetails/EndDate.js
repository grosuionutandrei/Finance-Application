import style from '../../mcss/CryptoDetails.module.css';
import styles from '../../mcss/SearchFormCrypto.module.css';
export function EndDate() {
  const buttonStyle = {
    marginLeft: '0px',
  };
  const setUnfollowDate = (event) => {
    event.preventDefault();
    console.log('to implement unfollow');
  };
  return (
    <div className={style.end_date}>
      <form className={style.end_date_form}>
        <label htmlFor="endDate">End date</label>
        <input type="date" id="endDate" name="endDate" />
        <button
          style={buttonStyle}
          className={styles.button_enabled_right}
          onClick={setUnfollowDate}
        >
          Unfollow
        </button>
      </form>
    </div>
  );
}
