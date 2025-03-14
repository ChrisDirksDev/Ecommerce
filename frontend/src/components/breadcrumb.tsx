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
    <div className="mb-4">
      <nav className="text-sm font-semibold">
        <Link to="/" className="hover:underline">Home</Link>
        {pathSegments.length > 0 && ' > '}
        {pathSegments.map((segment, index) => {
          const fullPath = generateLink(segment, index);
          return (
            <span key={index}>
              <Link to={fullPath} className="hover:underline">
                {segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
              </Link>
              {index < pathSegments.length - 1 && ' > '}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
