import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CartOverlay from "../pages/product/Cart";
import { useState } from "react";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main className="flex-1">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
