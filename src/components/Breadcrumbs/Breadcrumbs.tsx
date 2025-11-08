import "@/components/Breadcrumbs/Breadcrumbs.css";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type Props = {
  links: BreadcrumbItem[];
};

export function Breadcrumbs({ links }: Props) {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <nav className="breadcrumbs-row">
          {links.map((item, index) =>
            index < links.length - 1 ? (
              <Link href={item.href!} key={index} className="breadcrumb-item">
                {item.title}
                {index < links.length - 1 && (
                  <MdKeyboardArrowRight className="breadcrumb-separator" />
                )}
              </Link>
            ) : (
              <div key={index} className="breadcrumb-item active">
                {item.title}
                {index < links.length - 1 && (
                  <MdKeyboardArrowRight className="breadcrumb-separator" />
                )}
              </div>
            )
          )}
        </nav>
      </div>
    </div>
  );
}
