import "./globals.css";
import "swiper/css";

import type React from "react";
import Link from "next/link";
import { Store } from "lucide-react";
import {
  SavedProductsSidebar,
  Trigger as SavedProductsSidebarTrigger,
} from "@/components/SavedProductsSidebar";
import { SavedProductsProvider } from "@/contexts/SavedProductsContext";

export const metadata = {
  title: "   eCommerce",
  description: "A    eCommerce product listing with dynamic pricing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SavedProductsProvider>
          <SavedProductsSidebar>
            <header className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground py-4 z-40 shadow-md">
              <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                  eCommerce
                </Link>
                <nav className="flex items-center space-x-4">
                  <Link
                    href="/products"
                    className="hover:text-secondary transition-colors"
                  >
                    Products
                  </Link>
                  <SavedProductsSidebarTrigger>
                    <Store className="w-6 h-6 cursor-pointer hover:text-secondary transition-colors" />
                  </SavedProductsSidebarTrigger>
                </nav>
              </div>
            </header>
            <main className="min-h-screen bg-background pt-20">{children}</main>
            <footer className="bg-secondary text-secondary-foreground py-4 mt-8">
              <div className="container mx-auto px-4 text-center">
                &copy; 2023 eCommerce. All rights reserved.
              </div>
            </footer>
          </SavedProductsSidebar>
        </SavedProductsProvider>
      </body>
    </html>
  );
}
