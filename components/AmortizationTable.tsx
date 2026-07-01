'use client'

import { useState } from 'react'

export interface AmortizationRow {
  year: number
  totalPayment: number
  totalPrincipal: number
  totalInterest: number
  endBalance: number
}

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function AmortizationTable({ rows, label = 'amortization schedule' }: { rows: AmortizationRow[]; label?: string }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? rows : rows.slice(0, 5)

  if (rows.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-gray-800 dark:text-[#e2e8f0] mb-3">Amortization Schedule</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 text-xs uppercase">
              <th className="px-4 py-3 text-left font-semibold">Year</th>
              <th className="px-4 py-3 text-right font-semibold">Payment</th>
              <th className="px-4 py-3 text-right font-semibold">Principal</th>
              <th className="px-4 py-3 text-right font-semibold">Interest</th>
              <th className="px-4 py-3 text-right font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {visible.map((row) => (
              <tr key={row.year} className="bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-colors">
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-medium">{row.year}</td>
                <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmt(row.totalPayment)}</td>
                <td className="px-4 py-2.5 text-right text-green-700 dark:text-green-400">{fmt(row.totalPrincipal)}</td>
                <td className="px-4 py-2.5 text-right text-red-600 dark:text-red-400">{fmt(row.totalInterest)}</td>
                <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">{fmt(row.endBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium"
        >
          {expanded ? 'Show less' : `Show full ${label} (${rows.length} years)`}
        </button>
      )}
    </div>
  )
}
