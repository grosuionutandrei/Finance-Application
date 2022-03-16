import { NavLink } from 'react-router-dom';

export function CustomNavLink({ children, className, ...rest }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${isActive ? ' underline' : ''} ${className}`
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
}
