// app/(main)/layout.tsx
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ReduxProviderWrapper } from "@/providers/ReduxProviderWrapper";
import { AuthForms } from "@/components/AuthForms/AuthForms";
import { ToastContainer } from "react-toastify";
import { SessionProviderWrapper } from "@/providers/SessionAuthProviders";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <ReduxProviderWrapper>
        <ToastContainer
          position="top-right"
          theme="light"
          hideProgressBar={true}
          autoClose={3000}
        />
        <AuthForms />
        <Header />
        {children}
        <Footer />
      </ReduxProviderWrapper>
    </SessionProviderWrapper>
  );
}
