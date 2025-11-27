import "@/components/AccountComponents/AccountComponents.css";
import { AccountNav } from "./AccountNav";

export function AccauntOrdersContent({ orders }) {
  console.log(orders);
  return (
    <div className="container">
      <div className="account-content">
        <AccountNav />
        <div className="orders-history">
          <h2 className="fs-xl font-bold uppercase">Історія замовлень</h2>
          <div className="nothing-in-history">Історія замовлень порожня</div>
        </div>
      </div>
    </div>
  );
}
