
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 pb-8">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
