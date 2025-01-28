import type { Metadata } from "next";
import "./globals.css";
import { poppins, roboto } from "@/utils/fonts";
import Header from "@/components/atoms/Header";
import Footer from "@/components/atoms/Footer";
import { CartDrawerProvider } from "@/context/Cart";
import CartDrawer from "@/components/molecules/CartDrawer";

export const metadata: Metadata = {
  title: "e-ventos",
  description: "Compra de bilhetes para eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${poppins.variable} ${roboto.variable}`}>
      <body>
        <CartDrawerProvider>
          <Header />
          <CartDrawer />
          {children}
          <Footer />
        </CartDrawerProvider>
      </body>
    </html>
  );
}
