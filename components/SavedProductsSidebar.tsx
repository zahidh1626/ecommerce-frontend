"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useSavedProducts } from "@/contexts/SavedProductsContext"

interface SavedProductsSidebarProps {
  children: React.ReactNode
}

const SavedProductsSidebarContext = React.createContext<
  | {
      isOpen: boolean
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
  | undefined
>(undefined)

const SavedProductsSidebar: React.FC<SavedProductsSidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { savedProducts, removeSavedProduct } = useSavedProducts()

  return (
    <SavedProductsSidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} side="right">
        <SheetContent className="w-full sm:w-[400px] overflow-y-auto bg-background text-foreground">
          <SheetHeader>
            <SheetTitle className="text-foreground">Saved Products</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col space-y-4">
            {savedProducts.length > 0 ? (
              savedProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 border-b border-border pb-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                    
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeSavedProduct(product.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No saved products yet.</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
      {children}
    </SavedProductsSidebarContext.Provider>
  )
}

const Trigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = React.useContext(SavedProductsSidebarContext)
  if (!context) {
    throw new Error("SavedProductsSidebar.Trigger must be used within SavedProductsSidebar")
  }
  const { setIsOpen } = context

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="text-primary-foreground hover:text-secondary-foreground transition-colors"
    >
      {children}
    </button>
  )
}

SavedProductsSidebar.Trigger = Trigger

export { SavedProductsSidebar, Trigger }

