'use client'

export default function PrintCertificateButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
    >
      <span>🖨️</span> Print / Save PDF
    </button>
  )
}
