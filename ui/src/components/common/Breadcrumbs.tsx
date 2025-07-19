import { Link } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  to: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ul className="flex items-center text-sm">
        {items.map((item, index) => (
          <li key={item.to} className="flex items-center ">
            {index > 0 && <span className="select-none text-foreground-200/60 mx-2">/</span>}
            {index === items.length - 1 ? (
              <span
                className="text-foreground-200/60 font-medium max-w-40 overflow-hidden line-clamp-1 cursor-default"
                title={item.name}
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link to={item.to} className="text-foreground-200 max-w-40 overflow-hidden line-clamp-1">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
