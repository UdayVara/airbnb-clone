import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Providers } from "./redux/providers";
import ModalProvider from "./components/providers/ModalProvider";
import ToastProvider from "./components/providers/ToastProvider";
import RentModalProvider from "./components/providers/RentModalProvider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
           <Providers>
        <ToastProvider />
        <RentModalProvider />
          <Navbar />
          <ModalProvider />
          {children}
        </Providers>
         </body>
    </html>
  );
}
