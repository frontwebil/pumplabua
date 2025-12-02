"use client";

import "@/components/Breadcrumbs/Breadcrumbs.css";
import { setFiltersFromLink } from "@/redux/pamplabua/slices/productsSlice";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";

type BreadcrumbItem = {
  title: string;
  href?: string;
  category?: string;
};

type Props = {
  links: BreadcrumbItem[];
};

export function Breadcrumbs({ links }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const hanleRouteReplace = (category: string, href: string) => {
    if (category) {
      dispatch(setFiltersFromLink([category]));
    }

    router.replace(href);
  };

  return (
    <div className="breadcrumbs">
      <div className="container">
        <nav className="breadcrumbs-row">
          {links.map((item, index) =>
            index < links.length - 1 ? (
              <button
                onClick={() => hanleRouteReplace(item.category, item.href)}
                key={index}
                className="breadcrumb-item cursor-pointer"
              >
                {item.title}
                {index < links.length - 1 && (
                  <MdKeyboardArrowRight className="breadcrumb-separator" />
                )}
              </button>
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
