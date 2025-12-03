"use client";

import {
  initialStateType,
  setField,
} from "@/redux/admin/slices/addProductFormSlice";
import { RootState } from "@/redux/admin/store";
import { CATEGORYES } from "@/site-config/site.config";
import { useDispatch, useSelector } from "react-redux";

export function MainInfo() {
  const {
    nameProduct,
    producer,
    mainDescription,
    description,
    category,
    type,
  } = useSelector((store: RootState) => store.addProductFormSlice);
  const dispatch = useDispatch();

  const handleChangeInfo = (field: keyof initialStateType, value: string) => {
    dispatch(setField({ field, value }));
  };
  return (
    <div>
      <h2 className="mb-5 text-lg">Основна інформація:</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 600,
          }}
        >
          Назва продукту *
        </label>
        <input
          type="text"
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={nameProduct}
          onChange={(e) => handleChangeInfo("nameProduct", e.target.value)}
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
          Виробник *
        </label>
        <input
          type="text"
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={producer}
          onChange={(e) => handleChangeInfo("producer", e.target.value)}
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
          Короткий опис *
        </label>
        <textarea
          required
          rows={3}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={mainDescription}
          onChange={(e) => handleChangeInfo("mainDescription", e.target.value)}
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
          Повний опис
        </label>
        <textarea
          rows={5}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            resize: "vertical",
            whiteSpace: "pre-wrap",
          }}
          value={description}
          onChange={(e) => handleChangeInfo("description", e.target.value)}
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
          Категорія *
        </label>
        <select
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            background: "#fff",
            cursor: "pointer",
          }}
          value={category}
          onChange={(e) => handleChangeInfo("category", e.target.value)}
        >
          <option value="">Оберіть категорію</option>
          {CATEGORYES.map((category) => (
            <option value={category.value} key={category.key}>
              {category.value}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 600,
          }}
        >
          Підкатегорія / Тип продукту 
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
          value={type || ""}
          onChange={(e) => handleChangeInfo("type", e.target.value)}
        />
      </div>
    </div>
  );
}
