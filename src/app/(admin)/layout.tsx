import { SessionProviderWrapper } from "@/providers/SessionAuthProviders";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <header style={{ background: "#222", color: "#fff", padding: "1rem" }}>
          Панель Адміністрування
        </header>
        <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      </div>
    </SessionProviderWrapper>
  );
}
