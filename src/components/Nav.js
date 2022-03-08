import { useAuthContext } from '../features/Auth/Auth.context';
import { CustomNavLink } from './CustomNavLink';

export function Nav() {
  const { user, logout } = useAuthContext();
  return (
    <nav className="bg-slate-900">
      <ul className="flex gap-3 list-none text-slate-100 mx-auto my-0 lg:w-[960px] md:w-[540px]">
        <li>
          <CustomNavLink className="pl-0" to="/">
            Home
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/counter">Counter</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/weather">Weather</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/todos">Todos</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/movies">Movies</CustomNavLink>
        </li>

        {user && (
          <li className="p-3 ml-auto">
            Welcome, <strong>{user.firstName}! </strong>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="p-3"
            >
              Logout
            </a>
          </li>
        )}
        {!user && (
          <>
            <li className="ml-auto">
              <CustomNavLink to="/login">Login</CustomNavLink>
            </li>
            <li>
              <CustomNavLink className="pr-0" to="/register">
                Register
              </CustomNavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
