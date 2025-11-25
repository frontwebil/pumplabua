import { setFilters } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

export function SelectedFilters() {
  const { categorySelectFilters, producerSelectFilter, weightSelectFilter } =
    useSelector((store: RootState) => store.productsSlice);
  const dispatch = useDispatch();
  return (
    <div className="SelectedFilters">
      {categorySelectFilters.map((el, i) => (
        <div
          className="SelectedFilters-card"
          key={i}
          onClick={() => {
            dispatch(
              setFilters({
                value: el,
                filters: "categorySelectFilters",
              })
            );
          }}
        >
          <p>{el}</p>
          <CgClose />
        </div>
      ))}
      {producerSelectFilter.map((el, i) => (
        <div
          className="SelectedFilters-card"
          key={i}
          onClick={() => {
            dispatch(
              setFilters({
                value: el,
                filters: "producerSelectFilter",
              })
            );
          }}
        >
          <p>{el}</p>
          <CgClose />
        </div>
      ))}
      {weightSelectFilter.map((el, i) => (
        <div
          className="SelectedFilters-card"
          key={i}
          onClick={() => {
            dispatch(
              setFilters({
                value: el,
                filters: "weightSelectFilter",
              })
            );
          }}
        >
          <p>{el}</p>
          <CgClose />
        </div>
      ))}
    </div>
  );
}
