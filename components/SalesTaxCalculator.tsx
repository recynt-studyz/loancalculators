'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

const STATE_RATES: Record<string, { name: string; rate: number }> = {
  AL: { name: 'Alabama', rate: 4.0 },
  AK: { name: 'Alaska', rate: 0 },
  AZ: { name: 'Arizona', rate: 5.6 },
  AR: { name: 'Arkansas', rate: 6.5 },
  CA: { name: 'California', rate: 7.25 },
  CO: { name: 'Colorado', rate: 2.9 },
  CT: { name: 'Connecticut', rate: 6.35 },
  DE: { name: 'Delaware', rate: 0 },
  FL: { name: 'Florida', rate: 6.0 },
  GA: { name: 'Georgia', rate: 4.0 },
  HI: { name: 'Hawaii', rate: 4.0 },
  ID: { name: 'Idaho', rate: 6.0 },
  IL: { name: 'Illinois', rate: 6.25 },
  IN: { name: 'Indiana', rate: 7.0 },
  IA: { name: 'Iowa', rate: 6.0 },
  KS: { name: 'Kansas', rate: 6.5 },
  KY: { name: 'Kentucky', rate: 6.0 },
  LA: { name: 'Louisiana', rate: 4.45 },
  ME: { name: 'Maine', rate: 5.5 },
  MD: { name: 'Maryland', rate: 6.0 },
  MA: { name: 'Massachusetts', rate: 6.25 },
  MI: { name: 'Michigan', rate: 6.0 },
  MN: { name: 'Minnesota', rate: 6.875 },
  MS: { name: 'Mississippi', rate: 7.0 },
  MO: { name: 'Missouri', rate: 4.225 },
  MT: { name: 'Montana', rate: 0 },
  NE: { name: 'Nebraska', rate: 5.5 },
  NV: { name: 'Nevada', rate: 6.85 },
  NH: { name: 'New Hampshire', rate: 0 },
  NJ: { name: 'New Jersey', rate: 6.625 },
  NM: { name: 'New Mexico', rate: 5.0 },
  NY: { name: 'New York', rate: 4.0 },
  NC: { name: 'North Carolina', rate: 4.75 },
  ND: { name: 'North Dakota', rate: 5.0 },
  OH: { name: 'Ohio', rate: 5.75 },
  OK: { name: 'Oklahoma', rate: 4.5 },
  OR: { name: 'Oregon', rate: 0 },
  PA: { name: 'Pennsylvania', rate: 6.0 },
  RI: { name: 'Rhode Island', rate: 7.0 },
  SC: { name: 'South Carolina', rate: 6.0 },
  SD: { name: 'South Dakota', rate: 4.2 },
  TN: { name: 'Tennessee', rate: 7.0 },
  TX: { name: 'Texas', rate: 6.25 },
  UT: { name: 'Utah', rate: 5.95 },
  VT: { name: 'Vermont', rate: 6.0 },
  VA: { name: 'Virginia', rate: 5.3 },
  WA: { name: 'Washington', rate: 6.5 },
  WV: { name: 'West Virginia', rate: 6.0 },
  WI: { name: 'Wisconsin', rate: 5.0 },
  WY: { name: 'Wyoming', rate: 4.0 },
}

const STORAGE_KEY = 'lc-sales-tax'

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState('100')
  const [state, setState] = useState('TX')
  const [localTax, setLocalTax] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.price) setPrice(p.price)
        if (p.state) setState(p.state)
        if (p.localTax) setLocalTax(p.localTax)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const priceAmt = parseFloat(price) || 0
  const stateRate = STATE_RATES[state]?.rate || 0
  const localRate = parseFloat(localTax) || 0
  const totalRate = stateRate + localRate
  const taxAmount = priceAmt * totalRate / 100
  const totalPrice = priceAmt + taxAmount

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const noTaxStates = Object.entries(STATE_RATES).filter(([, s]) => s.rate === 0).map(([, s]) => s.name).join(', ')

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Pre-tax Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={price} onChange={e => { setPrice(e.target.value); save({ price: e.target.value }) }} className={`${inputCls} pl-7`} min="0" step="0.01" />
            </div>
          </div>
          <div>
            <label className={labelCls}>State</label>
            <select value={state} onChange={e => { setState(e.target.value); save({ state: e.target.value }) }} className={inputCls}>
              {Object.entries(STATE_RATES).sort(([, a], [, b]) => a.name.localeCompare(b.name)).map(([code, s]) => (
                <option key={code} value={code}>{s.name} ({s.rate}%)</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Additional Local Tax</label>
            <div className="relative">
              <input type="number" value={localTax} onChange={e => { setLocalTax(e.target.value); save({ localTax: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="10" step="0.1" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-3 text-xs text-blue-800 dark:text-blue-300">
            No state sales tax: {noTaxStates}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Total Price</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(totalPrice)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Effective tax rate: {totalRate.toFixed(3)}%</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: 'Pre-tax Price', val: fmt(priceAmt) },
              { label: `State Tax (${stateRate}%)`, val: fmt(priceAmt * stateRate / 100) },
              { label: `Local Tax (${localRate}%)`, val: fmt(priceAmt * localRate / 100) },
              { label: 'Total Sales Tax', val: fmt(taxAmount), bold: true },
              { label: 'Total Price', val: fmt(totalPrice), green: true },
            ].map(({ label, val, bold, green }) => (
              <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2' : ''}`}>
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-medium ${green ? 'text-green-700 dark:text-green-400 text-base' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. State rates are 2026 base rates; local rates vary. Consult a tax professional for precise calculations.
      </p>
    </div>
  )
}
