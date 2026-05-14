'use client'

export default function CopyBoilerplateButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
  }
  return (
    <button
      onClick={handleCopy}
      className="text-purple-600 text-sm font-semibold hover:text-purple-800 transition-colors"
    >
      📋 Click to copy boilerplate →
    </button>
  )
}
