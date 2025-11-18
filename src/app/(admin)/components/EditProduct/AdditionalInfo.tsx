"use client";

import { setField } from "@/redux/admin/slices/EditProductSlice";
import { RootState } from "@/redux/admin/store";
import { Product, Variant } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";

export function AdditionalInfo() {
  const { product } = useSelector((store: RootState) => store.editProductSlice);
  const dispatch = useDispatch();

  const handleChangeInfo = (
    field: keyof (Product & { variants: Variant[] }),
    value: string
  ) => {
    dispatch(setField({ field, value }));
  };

  const textareaStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  return (
    <details>
      <summary
        style={{ cursor: "pointer", fontWeight: 600, marginBottom: "1rem" }}
      >
        Додаткова інформація
      </summary>

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          Особливості
        </label>
        <textarea
          style={textareaStyle}
          rows={3}
          value={product.features || ""}
          onChange={(e) => handleChangeInfo("features", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          Для чого?
        </label>
        <textarea
          style={textareaStyle}
          rows={3}
          value={product.purpose || ""}
          onChange={(e) => handleChangeInfo("purpose", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          Компоненти
        </label>
        <textarea
          style={textareaStyle}
          rows={3}
          value={product.components || ""}
          onChange={(e) => handleChangeInfo("components", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          Додатково
        </label>
        <textarea
          style={textareaStyle}
          rows={3}
          value={product.additional || ""}
          onChange={(e) => handleChangeInfo("additional", e.target.value)}
        />
      </div>
    </details>
  );
}
