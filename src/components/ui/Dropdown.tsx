'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface DropdownItem {
  label?: string
  href?: string
  icon?: string
  onClick?: () => void
  destructive?: boolean
  divider?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  position?: 'left' | 'right'
  className?: string
  disabled?: boolean
}

export function Dropdown({ trigger, items, position = 'left', className = '', disabled = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const focusableElements = dropdownRef.current?.querySelectorAll('a, button')
      if (focusableElements && focusableElements.length > 0) {
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element)
        const nextIndex = event.key === 'ArrowDown' 
          ? (currentIndex + 1) % focusableElements.length
          : (currentIndex - 1 + focusableElements.length) % focusableElements.length
        ;(focusableElements[nextIndex] as HTMLElement).focus()
      }
    }
  }

  const renderItem = (item: DropdownItem, index: number) => {
    if (item.divider && !item.label) {
      return <div key={index} className="border-t border-gray-100 my-1" />
    }

    const baseClasses = "block w-full text-left px-4 py-2 text-sm transition-colors duration-150"
    const hoverClasses = item.destructive 
      ? "hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
      : "hover:bg-purple-50 hover:text-purple-600 focus:bg-purple-50 focus:text-purple-600"
    const textClasses = item.destructive ? "text-red-600" : "text-gray-700"

    if (item.href) {
      return (
        <Link
          key={index}
          href={item.href}
          className={`${baseClasses} ${hoverClasses} ${textClasses}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="flex items-center">
            {item.icon && <span className="mr-3 flex-shrink-0 text-[16px] leading-[20px]">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
          </span>
        </Link>
      )
    }

    if (item.onClick) {
      return (
        <button
          key={index}
          onClick={() => {
            item.onClick!()
            setIsOpen(false)
          }}
          className={`${baseClasses} ${hoverClasses} ${textClasses}`}
        >
          <span className="flex items-center">
            {item.icon && <span className="mr-3 flex-shrink-0 text-[16px] leading-[20px]">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
          </span>
        </button>
      )
    }

    // Static divider with label (like user email)
    if (item.divider && item.label) {
      return (
        <div key={index} className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
          {item.label}
        </div>
      )
    }

    return null
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="inline-flex items-center"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      
      {isOpen && (
        <div
          className={`
            absolute top-full mt-1 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5
            border border-gray-100 overflow-hidden z-[100]
            transform transition-all duration-150 ease-out
            ${position === 'right' ? 'right-0' : 'left-0'}
          `}
          style={{
            animation: 'dropdownSlideDown 0.15s ease-out'
          }}
        >
          <div className="py-1">
            {items.map((item, index) => renderItem(item, index))}
          </div>
        </div>
      )}
    </div>
  )
}

// Add CSS animation
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes dropdownSlideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)
}
