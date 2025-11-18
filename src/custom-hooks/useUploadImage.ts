"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/admin/store";
import { setUploadedUrls } from "@/redux/admin/slices/addProductFormSlice";
import axios from "axios";

export default function useUploadImages() {
  const dispatch = useDispatch();
  const { files } = useSelector(
    (state: RootState) => state.addProductFormSlice
  );

  const uploadImages = async () => {
    if (!files || files.length === 0) return [];

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("/api/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Сохраняем URL-и обратно в Redux
      dispatch(setUploadedUrls(data.urls));

      return data.urls;
    } catch (err) {
      console.error("Ошибка загрузки файлов:", err);
      return [];
    }
  };

  return { uploadImages };
}
