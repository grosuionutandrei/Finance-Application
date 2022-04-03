import { Outlet } from 'react-router-dom';
import { Navigation } from '../../stockComponents/Navigation';
import { Nav } from '../../components/Nav';
import { useAuthContext } from '../Auth/Auth.context';
import styles from '../../mcss/Outlet.module.css';
import { Footer } from '../../stockComponents/Footer';
export function Home() {
  const { user, token } = useAuthContext();
  if (token) {
    return (
      <>
        <Nav />
        <div className={styles.containerOutlet}>
          <Outlet />
        </div>
        <Footer />
      </>
    );
  }

  return <Navigation />;
}
