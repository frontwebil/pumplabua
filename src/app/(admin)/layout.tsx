import { ReduxProviderAdminWrapper } from "@/providers/ReduxProviderAdminWrapper";
import { SessionProviderWrapper } from "@/providers/SessionAuthProviders";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <ReduxProviderAdminWrapper>
        <ToastContainer
          position="top-right"
          theme="light"
          hideProgressBar={true}
          autoClose={3000}
        />
        <div>
          <header
            style={{ background: "#222", color: "#fff", padding: "1rem" }}
          >
            <div className="container flex justify-between">
              <Link href={"/admin-pamplabua-51nsugjabxhy/catalog"}>
                Catalog
              </Link>
              <Link href={"/admin-pamplabua-51nsugjabxhy/add-product"}>
                Додати товар
              </Link>
            </div>
          </header>
          <main className="container">{children}</main>
        </div>
      </ReduxProviderAdminWrapper>
    </SessionProviderWrapper>
  );
}
