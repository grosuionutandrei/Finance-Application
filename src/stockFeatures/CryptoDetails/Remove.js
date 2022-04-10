import style from '../../mcss/CryptoDetails.module.css';

export function Remove({ title }) {
  return (
    <div className={style.remove}>
      <button data-remove="removeCrypto">Remove</button>
    </div>
  );
}
