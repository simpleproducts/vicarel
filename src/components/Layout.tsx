import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="pt-24 md:pt-28 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
