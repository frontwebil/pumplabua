import {
  setFavoritesProducts,
  toggleAuthModal,
} from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LuShare } from "react-icons/lu";

export function ProductPageFuncButtons() {
  const { favoritesProducts, isLogged } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const { currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );
  const dispatch = useDispatch();

  const toggleFavorite = async (productId: string) => {
    if (!isLogged) {
      dispatch(toggleAuthModal());
      toast("Увійдіть, щоб додати в улюблені");
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

  const productId = currentProduct?.id ?? "";
  const isFavorite = favoritesProducts && favoritesProducts.includes(productId);

  return (
    <div className="ProductPagePrice-row-funcionalButtons">
      <div
        className="ProductPagePrice-row-favorites"
        onClick={() => currentProduct?.id && toggleFavorite(currentProduct.id)}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </div>
      <div className="ProductPagePrice-row-share">
        <LuShare />
      </div>
    </div>
  );
}
