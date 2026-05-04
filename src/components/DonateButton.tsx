'use client'

import Link from 'next/link'

interface DonateButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showIcon?: boolean
}

export default function DonateButton({ 
  variant = 'primary', 
  size = 'md',
  className = '',
  showIcon = true 
}: DonateButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
  
  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg",
    secondary: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
  }
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const donationUrl = process.env.NEXT_PUBLIC_PAYPAL_DONATION_URL?.trim()
  const hasLiveDonationUrl = Boolean(donationUrl)
  const href = hasLiveDonationUrl ? donationUrl : '/contact?subject=donation'
  const label = hasLiveDonationUrl ? 'Donate Now' : 'Contact Us to Donate'

  return (
    <Link
      href={href}
      target={hasLiveDonationUrl ? '_blank' : undefined}
      rel={hasLiveDonationUrl ? 'noopener noreferrer' : undefined}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <span className="mr-2">💜</span>}
      {label}
    </Link>
  )
}
