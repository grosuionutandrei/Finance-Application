import { CustomNavLink } from './CustomNavLink';
import styles from '../../mcss/Navigation.module.css';
import { LoginPage } from '../LoginPage';
import { useState } from 'react';
export function Navigation() {
  const [loginStyle, setLoginStyle] = useState(styles.login);
  const [registerStyle, setRegisterStyle] = useState(styles.register);

  const changeClass = function cahangeClass(ele) {
    const state = ele.innerText === 'Login' ? 'Login' : 'Register';
    if (state === 'Login') {
      setLoginStyle(styles.login_pressed);
      setRegisterStyle(styles.register);
    } else if (state === 'Register') {
      setLoginStyle(styles.login);
      setRegisterStyle(styles.register_pressed);
    }
    console.log(state);

    // const sibblingButton = document.querySelector(`[data-state=${state}]`);
    // sibblingButton.classList.remove(styles.pressed);
    // console.log(sibblingButton.dataset.state);
  };

  function activateButton(e) {
    changeClass(e.target);
  }
  return (
    <div className={styles.login_modal}>
      <nav className={styles.loggin_container}>
        <CustomNavLink
          data-state="login"
          className={loginStyle}
          to="/login"
          onClick={activateButton}
        >
          Login
        </CustomNavLink>
        <CustomNavLink
          data-state="register"
          to="/register"
          className={registerStyle}
          onClick={activateButton}
        >
          Register
        </CustomNavLink>
      </nav>

      <LoginPage />
    </div>
  );
}
