"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addVariant,
  removeVariant,
  updateVariant as reduxUpdateVariantFuction,
  Variant,
} from "@/redux/admin/slices/addProductFormSlice";
import { RootState } from "@/redux/admin/store";

export function Variants() {
  const { variants } = useSelector(
    (store: RootState) => store.addProductFormSlice
  );
  const dispatch = useDispatch();

  const addNewVariant = () => {
    dispatch(addVariant());
  };

  const updateVariant = <K extends keyof Variant>(
    index: number,
    field: K,
    value: Variant[K]
  ) => {
    dispatch(reduxUpdateVariantFuction({ index, field, value }));
  };

  return (
    <div
      style={{
        marginBottom: "2rem",
        background: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>Варіанти продукту</h2>
        <button
          type="button"
          onClick={addNewVariant}
          style={{
            padding: "0.5rem 1rem",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Додати варіант
        </button>
      </div>

      {variants.map((variant, index) => (
        <div
          key={index}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3>Варіант {index + 1}</h3>
            {variants.length > 1 && (
              <button
                type="button"
                onClick={() => dispatch(removeVariant(index))}
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Видалити
              </button>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Смак / Опис ( Для аксесуарів )
              </label>
              <input
                type="text"
                value={variant.flavor}
                onChange={(e) => updateVariant(index, "flavor", e.target.value)}
                placeholder="Шоколад, Ваніль..."
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Ціна (грн) *
              </label>
              <input
                type="number"
                step="0.01"
                value={variant.price}
                onChange={(e) => updateVariant(index, "price", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Одиниця виміру *
              </label>
              <select
                value={variant.unitType}
                onChange={(e) =>
                  updateVariant(index, "unitType", e.target.value)
                }
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              >
                <option value="g">г (грами)</option>
                <option value="kg">кг (кілограми)</option>
                <option value="ml">мл (мілілітри)</option>
                <option value="l">л (літри)</option>
                <option value="pcs">шт (штуки)</option>
                <option value="caps">капс (капсули)</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Кількість / Вага *
              </label>
              <input
                type="number"
                step="0.01"
                value={variant.amount}
                onChange={(e) => updateVariant(index, "amount", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Знижка (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={variant.discount}
                onChange={(e) =>
                  updateVariant(index, "discount", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="checkbox"
                  checked={variant.inStock}
                  onChange={(e) =>
                    updateVariant(index, "inStock", e.target.checked)
                  }
                />
                В наявності
              </label>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="checkbox"
                  checked={variant.isMain || false}
                  onChange={(e) =>
                    updateVariant(index, "isMain", e.target.checked)
                  }
                />
                Основний варіант
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
