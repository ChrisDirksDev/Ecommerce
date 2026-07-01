import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  const hiddenRoutes = [/^\/admin/, "/checkout", "/login", "/signup"];

  if (hiddenRoutes.some((route) => (typeof route === "string" ? location.pathname === route : route.test(location.pathname)))) {
    return null;
  }

  // Split the current path into segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Function to create a URL for each breadcrumb
  const generateLink = (segment: string, index: number) => {
    // Join the segments up to the current index to form the path
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return path;
  };

  return (
    <div className="py-4">
      <nav className="text-sm font-semibold text-[var(--color-muted-gray-brown)]" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-[var(--color-warm-gold)]">Home</Link>
        {pathSegments.length > 0 && <span className="mx-2 text-[var(--color-border)]">/</span>}
        {pathSegments.map((segment, index) => {
          const fullPath = generateLink(segment, index);
          return (
            <span key={index}>
              <Link to={fullPath} className="transition hover:text-[var(--color-warm-gold)]">
                {segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
              </Link>
              {index < pathSegments.length - 1 && <span className="mx-2 text-[var(--color-border)]">/</span>}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
