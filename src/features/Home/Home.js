import { Outlet } from 'react-router-dom';
import { Navigation } from '../../mfeatures/mcomponenets/Navigation';
import { Nav } from '../../components/Nav';
import { useAuthContext } from '../Auth/Auth.context';

export function Home() {
  const { user, token } = useAuthContext();
  if (token) {
    return (
      <>
        <Nav />
        <div className="lg:w-[960px] md:w-[540px] mx-auto">
          <Outlet />
        </div>
      </>
    );
  }

  return <Navigation />;
}
