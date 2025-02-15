"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  side?: "left" | "right" | "top" | "bottom"
}

const Sheet: React.FC<SheetProps> = ({ children, isOpen, onClose, side = "right" }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div
        className={cn(
          "fixed bg-white shadow-lg transition-transform duration-300 ease-in-out",
          {
            "inset-y-0 right-0 w-full max-w-sm": side === "right",
            "inset-y-0 left-0 w-full max-w-sm": side === "left",
            "inset-x-0 top-0 h-full max-h-sm": side === "top",
            "inset-x-0 bottom-0 h-full max-h-sm": side === "bottom",
          },
          isOpen ? "translate-x-0" : side === "right" ? "translate-x-full" : "translate-x-[-100%]",
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

const SheetContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={cn("h-full overflow-y-auto p-6", className)}>{children}</div>
)

const SheetHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left mb-6", className)}>{children}</div>
)

const SheetTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h2 className={cn("text-lg font-semibold text-foreground", className)}>{children}</h2>
)

export { Sheet, SheetContent, SheetHeader, SheetTitle }

