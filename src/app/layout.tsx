import type { Metadata } from "next";
import "./globals.css";
import { poppins, roboto } from "@/utils/fonts";
import Header from "@/components/atoms/Header";
import Footer from "@/components/atoms/Footer";
import { CartDrawerProvider } from "@/context/Cart";
import CartDrawer from "@/components/molecules/CartDrawer";
import { AuthProvider } from "@/context/Auth";
import { LoadingProvider } from "@/context/Loading";
import LoadingOverlay from "@/components/atoms/LoadingOverlay";

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
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body>
        <AuthProvider>
          <LoadingProvider>
            <CartDrawerProvider>
              <Header />
              <LoadingOverlay />
              <CartDrawer />
              {children}
              <Footer />
            </CartDrawerProvider>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
