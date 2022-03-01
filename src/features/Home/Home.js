import { Outlet } from 'react-router-dom';
import { Nav } from '../../components/Nav';

export function Home() {
  return (
    <>
      <Nav />
      <div className="lg:w-[960px] md:w-[540px] mx-auto">
        <Outlet />
      </div>
    </>
  );
}
