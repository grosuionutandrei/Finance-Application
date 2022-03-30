import { Link } from 'react-router-dom';

export function CustomLink({ className, children, ...rest }) {
  return (
    <Link className={`${className}`} {...rest}>
      {children}
    </Link>
  );
}
