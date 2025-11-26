// app/(main)/layout.tsx
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ReduxProviderWrapper } from "@/providers/ReduxProviderWrapper";
import { AuthForms } from "@/components/AuthForms/AuthForms";
import { ToastContainer } from "react-toastify";
import { SessionProviderWrapper } from "@/providers/SessionAuthProviders";
import { QueryProviders } from "@/providers/QueryProvider";
import { OrderModal } from "@/components/OrderModal/OrderModal";
import { OrderCart } from "@/components/OrderCart/OrderCart";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <ReduxProviderWrapper>
        <QueryProviders>
          <ToastContainer
            position="top-right"
            theme="light"
            hideProgressBar={true}
            autoClose={3000}
          />
          <AuthForms />
          <OrderModal />
          <OrderCart />
          <Header />
          {children}
          <Footer />
        </QueryProviders>
      </ReduxProviderWrapper>
    </SessionProviderWrapper>
  );
}
