"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addVariant,
  removeVariant,
  updateVariant as reduxUpdateVariantFuction,
  Variant,
} from "@/redux/admin/slices/addProductFormSlice";
import { RootState } from "@/redux/admin/store";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export function Variants() {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
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

  const handleImageUpload = async (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadingIndex(index);

    try {
      const file = files[0]; // Беремо тільки перший файл

      // Створюємо FormData
      const formData = new FormData();
      formData.append("images", file);

      // Відправляємо на API
      const response = await axios.post("/api/upload-images", formData);

      const data = await response.data;

      // Додаємо нову URL до існуючих
      const currentImages = variants[index].images || [];
      updateVariant(index, "images", [...currentImages, ...data.urls]);

      toast.success("Фото завантажено!");
    } catch (error) {
      console.error("Помилка завантаження:", error);
      toast.error("Помилка завантаження фото");
    } finally {
      setUploadingIndex(null);
    }
  };

  const moveImage = (
    variantIndex: number,
    imageIndex: number,
    direction: "left" | "right"
  ) => {
    const currentImages = [...variants[variantIndex].images];
    const newIndex = direction === "left" ? imageIndex - 1 : imageIndex + 1;

    // Перевірка меж масиву
    if (newIndex < 0 || newIndex >= currentImages.length) return;

    // Міняємо місцями
    [currentImages[imageIndex], currentImages[newIndex]] = [
      currentImages[newIndex],
      currentImages[imageIndex],
    ];

    updateVariant(variantIndex, "images", currentImages);
  };

  const removeImage = (variantIndex: number, imageIndex: number) => {
    const currentImages = [...variants[variantIndex].images];
    currentImages.splice(imageIndex, 1);
    updateVariant(variantIndex, "images", currentImages);
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
                <option value="size">розмір</option>
                <option value="tabs">таблетки(Таб)</option>
                <option value="gum">жувальні(gum)</option>
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
                Кількість / Вага / Розмір *
              </label>
              <input
                type="text"
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

          <div style={{ marginTop: "1rem" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e.target.files)}
                disabled={uploadingIndex === index}
                style={{
                  display: "block",
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </label>
            {uploadingIndex === index && (
              <p style={{ color: "#007bff" }}>Завантаження фото...</p>
            )}
          </div>

          {variant.images && variant.images.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {variant.images.map((url, imgIndex) => (
                <div
                  key={imgIndex}
                  style={{
                    position: "relative",
                    aspectRatio: "1",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={url}
                    alt={`Фото ${imgIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* Кнопки управління */}
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      right: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "4px",
                    }}
                  >
                    {/* Стрілка вліво */}
                    <button
                      type="button"
                      onClick={() => moveImage(index, imgIndex, "left")}
                      disabled={imgIndex === 0}
                      style={{
                        background: imgIndex === 0 ? "#ccc" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        width: "28px",
                        height: "28px",
                        cursor: imgIndex === 0 ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                      title="Перемістити вліво"
                    >
                      ←
                    </button>

                    {/* Стрілка вправо */}
                    <button
                      type="button"
                      onClick={() => moveImage(index, imgIndex, "right")}
                      disabled={imgIndex === variant.images.length - 1}
                      style={{
                        background:
                          imgIndex === variant.images.length - 1
                            ? "#ccc"
                            : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        width: "28px",
                        height: "28px",
                        cursor:
                          imgIndex === variant.images.length - 1
                            ? "not-allowed"
                            : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                      title="Перемістити вправо"
                    >
                      →
                    </button>
                  </div>

                  {/* Кнопка видалення */}
                  <button
                    type="button"
                    onClick={() => removeImage(index, imgIndex)}
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      background: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                    title="Видалити фото"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
