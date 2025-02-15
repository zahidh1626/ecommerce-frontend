"use client"

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a'

interface FilterBarProps {
  onSort: (option: SortOption) => void
}

const FilterBar: React.FC<FilterBarProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SortOption>('newest')

  const handleSort = (option: SortOption) => {
    setSelectedOption(option)
    onSort(option)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left mb-6">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Sort by: {selectedOption.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => handleSort('newest')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Newest
            </button>
            <button
              onClick={() => handleSort('price-low-high')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSort('price-high-low')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Price: High to Low
            </button>
            <button
              onClick={() => handleSort('name-a-z')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Name: A to Z
            </button>
            <button
              onClick={() => handleSort('name-z-a')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Name: Z to A
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
