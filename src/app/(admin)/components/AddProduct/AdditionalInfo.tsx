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

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    minHeight: "120px",
    resize: "vertical",
    whiteSpace: "pre-wrap",
  };

  return (
    <details>
      <summary
        style={{ cursor: "pointer", fontWeight: 600, marginBottom: "1rem" }}
      >
        Додаткова інформація
      </summary>

      {/* Особливості */}
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

        <textarea
          style={textareaStyle}
          value={features}
          onChange={(e) => handleChangeInfo("features", e.target.value)}
        ></textarea>
      </div>

      {/* Для чого */}
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

        <textarea
          style={textareaStyle}
          value={purpose}
          onChange={(e) => handleChangeInfo("purpose", e.target.value)}
        ></textarea>
      </div>

      {/* Компоненти */}
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

        <textarea
          style={textareaStyle}
          value={components}
          onChange={(e) => handleChangeInfo("components", e.target.value)}
        ></textarea>
      </div>

      {/* Додатково */}
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

        <textarea
          style={textareaStyle}
          value={additional}
          onChange={(e) => handleChangeInfo("additional", e.target.value)}
        ></textarea>
      </div>
    </details>
  );
}
