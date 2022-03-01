import { CustomNavLink } from './CustomNavLink';

export function Nav() {
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
        <li className="ml-auto">
          <CustomNavLink to="/login">Login</CustomNavLink>
        </li>
        <li>
          <CustomNavLink className="pr-0" to="/register">
            Register
          </CustomNavLink>
        </li>
      </ul>
    </nav>
  );
}
