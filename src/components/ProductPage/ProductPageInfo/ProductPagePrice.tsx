import {
  setFavoritesProducts,
  toggleAuthModal,
} from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import axios from "axios";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function ProductPagePrice() {
  const { quantityProduct, selectedVariant, currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );
  const { favoritesProducts, isLogged } = useSelector(
    (store: RootState) => store.uiSlice
  );

  const dispatch = useDispatch();

  if (!selectedVariant) return null;

  const toggleFavorite = async (productId: string) => {
    if (!isLogged) {
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
          toast("Увійдіть, щоб додати в улюблені");
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          toggleFavorite(currentProduct?.id!);
        }}
      >
        <Image src={`/icons/heart.svg`} width={20} height={20} alt="heart" />
      </div>
    );
  }

  const price = quantityProduct * selectedVariant.price;

  const productId = currentProduct?.id ?? "";
  const isFavorite = favoritesProducts.includes(productId);

  return (
    <div className="ProductPagePrice">
      <h2 className="ProductPagePrice-delivery">
        БЕЗКОШТОВНА доставка замовлень від 3.000 грн
      </h2>

      <div className="ProductPagePrice-row">
        <div className="ProductPagePrice-row-price">{price}</div>
        <div className="ProductPagePrice-row-addCart">додати у кошик</div>
        <div className="ProductPagePrice-row-funcionalButtons">
          <div className="ProductPagePrice-row-favorites">
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
      </div>
    </div>
  );
}
