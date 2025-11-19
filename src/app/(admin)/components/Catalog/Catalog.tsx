import { Product, Variant } from "@prisma/client";
import Link from "next/link";

export function AdminCatalogRow({
  product,
}: {
  product: Product & { variants: Variant[] };
}) {
  function formatDate(dateString: Date) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month} ${hours}:${minutes}`;
  }
  return (
    <div className="grid grid-cols-9 items-center p-3 border-b border-gray-200 text-sm">
      {/* НАЗВАНИЕ */}
      <div className="font-semibold">{product.name}</div>

      {/* ПРОИЗВОДИТЕЛЬ */}
      <div>{product.producer}</div>

      {/* КАТЕГОРИЯ */}
      <div className="capitalize">{product.category}</div>

      {/* ВАРИАНТЫ */}
      <div className="text-center">{product.variants.length || 0}</div>

      {/* АКТИВНОСТЬ */}
      <div className={product.isActive ? "text-green-600" : "text-red-600"}>
        {product.isActive ? "Активний" : "Прихований"}
      </div>
      <div
        className={product.isBestseller ? "text-green-600" : "text-gray-600"}
      >
        {product.isBestseller ? "Так" : "Ні"}
      </div>
      <div>{formatDate(product.updatedAt)}</div>
      <div>{formatDate(product.createdAt)}</div>

      {/* КНОПКА */}
      <div>
        <Link
          href={`/admin-pamplabua-51nsugjabxhy/edit-product/${product.id}`}
          className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 transition"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
