"use client";

import { useEffect } from "react";
import type { Product } from "@/types/Product";
import { X } from "lucide-react";
// import Image from "next/image";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
}: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  console.log(product, "product");
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card text-card-foreground rounded-lg max-w-2xl w-full relative overflow-hidden">
        <div className="relative h-64">
          {/* used html tag because api has different image urls rondomly for now */}
          <img
            width={500}
            height={500}
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={onClose}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
