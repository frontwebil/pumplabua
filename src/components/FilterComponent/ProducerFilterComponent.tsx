import { RootState } from "@/redux/pamplabua/store";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";

export function ProducerFilterComponent() {
  const { producerCount } = useSelector(
    (store: RootState) => store.productsSlice
  );
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <p className="fs-lg font-bold uppercase">Виробник</p>
        <MdKeyboardArrowDown
          className={`filter-arrow ${open ? "open" : ""}`}
          size={20}
        />
      </div>
      {open && (
        <ul className="filter-list">
          {Object.entries(producerCount).map(([key, value]) => (
            <li className="filter-item" key={key}>
              <label className="filter-label">
                <input type="checkbox" />
                <span className="fs-lg">{key}</span>
              </label>
              <span className="filter-count fs-md">{`(${value})`}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
