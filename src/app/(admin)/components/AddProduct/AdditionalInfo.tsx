"use client";

import {
  initialStateType,
  setField,
} from "@/redux/admin/slices/addProductFormSlice";
import { RootState } from "@/redux/admin/store";
import { useDispatch, useSelector } from "react-redux";

export function AdditionalInfo() {
  const { features, purpose, components, additional } = useSelector(
    (store: RootState) => store.addProductFormSlice
  );
  const dispatch = useDispatch();

  const handleChangeInfo = (field: keyof initialStateType, value: string) => {
    dispatch(setField({ field, value }));
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
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 600,
          }}
        >
          Особливості
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={features}
          onChange={(e) => handleChangeInfo("features", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 600,
          }}
        >
          Для чого?
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={purpose}
          onChange={(e) => handleChangeInfo("purpose", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 600,
          }}
        >
          Компоненти
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={components}
          onChange={(e) => handleChangeInfo("components", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 600,
          }}
        >
          Додатково
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={additional}
          onChange={(e) => handleChangeInfo("additional", e.target.value)}
        />
      </div>
    </details>
  );
}
