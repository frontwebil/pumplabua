"use client";

import {
  setFavoritesProducts,
  toggleAuthModal,
} from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function AddToFavorites({ productId }: { productId: string }) {
  const { favoritesProducts, isLogged } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const dispatch = useDispatch();

  const toggleFavorite = async (productId: string) => {
    if (!isLogged) {
      toast("Увійдіть, щоб додати в улюблені");
      dispatch(toggleAuthModal());
      return;
    }

    try {
      const { data } = await axios.patch("/api/user/updateFavorites", {
        productId,
      });

      if (data.favoriteProducts.includes(productId)) {
        toast.success("Товар додано до збережених");
      } else {
        toast.info("Товар видалено зі збережених");
      }
      dispatch(setFavoritesProducts(data));

      return data.favoriteProducts;
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  if (!favoritesProducts) {
    return (
      <div
        className="fav-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(productId);
        }}
      >
        <Image src={`/icons/heart.svg`} width={20} height={20} alt="heart" />
      </div>
    );
  }

  return (
    <div
      className="fav-button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
      }}
    >
      <Image
        src={`${
          favoritesProducts.includes(productId)
            ? "/icons/heart-stright.svg"
            : "/icons/heart.svg"
        }`}
        width={20}
        height={20}
        alt="heart"
      />
    </div>
  );
}
