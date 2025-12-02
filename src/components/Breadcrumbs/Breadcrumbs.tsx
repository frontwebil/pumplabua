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

  const hanleRouteReplace = (item: BreadcrumbItem) => {
    // ✅ якщо є category — застосовуємо фільтр
    if (item.category) {
      dispatch(setFiltersFromLink([item.category]));
    }

    // ✅ якщо є href — навігація
    if (item.href) {
      router.replace(item.href);
    }
  };

  return (
    <div className="breadcrumbs">
      <div className="container">
        <nav className="breadcrumbs-row">
          {links.map((item, index) => {
            const isLast = index === links.length - 1;
            const isClickable = !!item.href || !!item.category;

            return isLast ? (
              <div key={index} className="breadcrumb-item active">
                {item.title}
              </div>
            ) : (
              <button
                key={index}
                onClick={() => hanleRouteReplace(item)}
                className={`breadcrumb-item ${
                  isClickable ? "cursor-pointer" : ""
                }`}
                disabled={!isClickable}
              >
                {item.title}
                <MdKeyboardArrowRight className="breadcrumb-separator" />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
