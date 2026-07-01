'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

function calcPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months
  const r = annualRate / 100 / 12
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

const STORAGE_KEY = 'lc-refinance'

export default function RefinanceCalculator() {
  const [balance, setBalance] = useState('280000')
  const [currentRate, setCurrentRate] = useState('7.5')
  const [currentPayment, setCurrentPayment] = useState('2097')
  const [newRate, setNewRate] = useState('6.5')
  const [newTerm, setNewTerm] = useState('30')
  const [closingCosts, setClosingCosts] = useState('6000')
  const [stayYears, setStayYears] = useState('5')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.balance) setBalance(p.balance)
        if (p.currentRate) setCurrentRate(p.currentRate)
        if (p.currentPayment) setCurrentPayment(p.currentPayment)
        if (p.newRate) setNewRate(p.newRate)
        if (p.newTerm) setNewTerm(p.newTerm)
        if (p.closingCosts) setClosingCosts(p.closingCosts)
        if (p.stayYears) setStayYears(p.stayYears)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const bal = parseFloat(balance) || 0
  const curRate = parseFloat(currentRate) || 0
  const curPay = parseFloat(currentPayment) || 0
  const nRate = parseFloat(newRate) || 0
  const nTermMonths = parseInt(newTerm) * 12
  const cc = parseFloat(closingCosts) || 0
  const stayMos = (parseInt(stayYears) || 5) * 12

  const newPayment = calcPayment(bal, nRate, nTermMonths)
  const monthlySavings = curPay - newPayment
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(cc / monthlySavings) : Infinity
  const savings5yr = monthlySavings * Math.min(60, stayMos) - cc
  const lifetimeSavings = monthlySavings * nTermMonths - cc

  const makesSense = isFinite(breakEvenMonths) && breakEvenMonths <= stayMos

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Loan</p>
          <div>
            <label className={labelCls}>Current Loan Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={balance} onChange={e => { setBalance(e.target.value); save({ balance: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Current Rate</label>
              <div className="relative">
                <input type="number" value={currentRate} onChange={e => { setCurrentRate(e.target.value); save({ currentRate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="30" step="0.1" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Current Payment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={currentPayment} onChange={e => { setCurrentPayment(e.target.value); save({ currentPayment: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 pt-2">New Loan</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>New Interest Rate</label>
              <div className="relative">
                <input type="number" value={newRate} onChange={e => { setNewRate(e.target.value); save({ newRate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="30" step="0.1" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>New Loan Term</label>
              <select value={newTerm} onChange={e => { setNewTerm(e.target.value); save({ newTerm: e.target.value }) }} className={inputCls}>
                <option value="30">30 years</option>
                <option value="20">20 years</option>
                <option value="15">15 years</option>
                <option value="10">10 years</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Closing Costs</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={closingCosts} onChange={e => { setClosingCosts(e.target.value); save({ closingCosts: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>How long will you stay in this home?</label>
            <select value={stayYears} onChange={e => { setStayYears(e.target.value); save({ stayYears: e.target.value }) }} className={inputCls}>
              {[1, 2, 3, 5, 7, 10, 15, 20, 30].map(y => <option key={y} value={y}>{y} year{y > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">New Monthly Payment</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(newPayment)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Monthly savings: {fmt(monthlySavings)}</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: 'Current Payment', val: fmt(curPay) },
              { label: 'New Payment', val: fmt(newPayment) },
              { label: 'Monthly Savings', val: fmt(monthlySavings), green: monthlySavings > 0 },
              { label: 'Break-even Point', val: isFinite(breakEvenMonths) ? `${breakEvenMonths} months` : 'Never' },
              { label: `Savings over ${stayYears} years`, val: fmt(savings5yr) },
              { label: 'Lifetime Savings', val: fmt(lifetimeSavings) },
            ].map(({ label, val, green }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-medium ${green ? 'text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
              </div>
            ))}
          </div>
          <div className={`rounded-xl border p-4 text-sm font-medium ${makesSense ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300' : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300'}`}>
            {makesSense
              ? `✅ Refinancing makes sense — you will break even in ${breakEvenMonths} months and you plan to stay for ${stayMos} months.`
              : isFinite(breakEvenMonths)
                ? `❌ May not be worth it — break-even is ${breakEvenMonths} months but you only plan to stay ${stayMos} months.`
                : '❌ Monthly savings are too small to recover closing costs.'}
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
