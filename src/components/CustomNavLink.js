import { NavLink } from 'react-router-dom';

export function CustomNavLink({ children, className, ...rest }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `inline-block py-3 px-3${isActive ? ' underline' : ''} ${className}`
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
}
