import type { Metadata } from "next";
import "./globals.css";
import { poppins, roboto } from "@/utils/fonts";
import Header from "@/components/atoms/Header";
import Footer from "@/components/atoms/Footer";

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
        <>
          <Header />
          {children}
          <Footer />
        </>
      </body>
    </html>
  );
}
