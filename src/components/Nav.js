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
          <CustomNavLink to="/crypto">Crypto</CustomNavLink>
        </li>

        <li>
          <CustomNavLink to="/trackedItems">TrackedItems</CustomNavLink>
        </li>
        {user && (
          <li className="p-3 ml-auto">
            Welcome,
            <CustomNavLink to="/profile" className="py-0 px-0">
              <strong>{user.firstName}! </strong>
            </CustomNavLink>
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
