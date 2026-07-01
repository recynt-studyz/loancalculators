'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

function maxLoanFromPayment(monthlyPayment: number, annualRate: number, months: number): number {
  if (annualRate === 0) return monthlyPayment * months
  const r = annualRate / 100 / 12
  return monthlyPayment * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months))
}

const STORAGE_KEY = 'lc-affordability'

export default function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState('100000')
  const [monthlyDebts, setMonthlyDebts] = useState('500')
  const [downPayment, setDownPayment] = useState('60000')
  const [rate, setRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [taxRate, setTaxRate] = useState('1.2')
  const [insurance, setInsurance] = useState('1500')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.annualIncome) setAnnualIncome(p.annualIncome)
        if (p.monthlyDebts) setMonthlyDebts(p.monthlyDebts)
        if (p.downPayment) setDownPayment(p.downPayment)
        if (p.rate) setRate(p.rate)
        if (p.loanTerm) setLoanTerm(p.loanTerm)
        if (p.taxRate) setTaxRate(p.taxRate)
        if (p.insurance) setInsurance(p.insurance)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const income = parseFloat(annualIncome) || 0
  const debts = parseFloat(monthlyDebts) || 0
  const dp = parseFloat(downPayment) || 0
  const r = parseFloat(rate) || 0
  const months = parseInt(loanTerm) * 12
  const propTaxRate = parseFloat(taxRate) || 0
  const homeIns = parseFloat(insurance) || 0
  const monthlyIncome = income / 12

  // 28% front-end (housing only), 36% back-end (all debts), 43% aggressive
  const scenarios = [
    { label: 'Conservative', pct: 28, color: 'green' },
    { label: 'Moderate', pct: 36, color: 'yellow' },
    { label: 'Aggressive', pct: 43, color: 'red' },
  ]

  function calcMaxHome(dtiPct: number) {
    const maxHousingPayment = monthlyIncome * (dtiPct / 100) - debts
    if (maxHousingPayment <= 0) return { maxHome: 0, maxLoan: 0, maxPayment: 0 }
    // maxHousingPayment = PI + tax + insurance
    // tax = home * taxRate/100/12
    // insurance = homeIns/12
    // PI = maxHousingPayment - tax - insurance
    // Need to iterate since tax depends on home price
    let homePrice = dp + maxLoanFromPayment(Math.max(0, maxHousingPayment - homeIns / 12), r, months)
    for (let i = 0; i < 10; i++) {
      const propTaxMonthly = homePrice * propTaxRate / 100 / 12
      const piRoom = Math.max(0, maxHousingPayment - propTaxMonthly - homeIns / 12)
      const maxLoan = maxLoanFromPayment(piRoom, r, months)
      homePrice = dp + maxLoan
    }
    const propTaxMonthly = homePrice * propTaxRate / 100 / 12
    const piRoom = Math.max(0, maxHousingPayment - propTaxMonthly - homeIns / 12)
    const maxLoan = maxLoanFromPayment(piRoom, r, months)
    return { maxHome: dp + maxLoan, maxLoan, maxPayment: maxHousingPayment }
  }

  const results = scenarios.map(s => ({ ...s, ...calcMaxHome(s.pct) }))
  const moderate = results[1]

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={annualIncome} onChange={e => { setAnnualIncome(e.target.value); save({ annualIncome: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Monthly Debts (car, student loans, etc.)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={monthlyDebts} onChange={e => { setMonthlyDebts(e.target.value); save({ monthlyDebts: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Down Payment</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={downPayment} onChange={e => { setDownPayment(e.target.value); save({ downPayment: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Interest Rate</label>
              <div className="relative">
                <input type="number" value={rate} onChange={e => { setRate(e.target.value); save({ rate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="30" step="0.1" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Loan Term</label>
              <select value={loanTerm} onChange={e => { setLoanTerm(e.target.value); save({ loanTerm: e.target.value }) }} className={inputCls}>
                <option value="30">30 years</option>
                <option value="20">20 years</option>
                <option value="15">15 years</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Property Tax Rate</label>
              <div className="relative">
                <input type="number" value={taxRate} onChange={e => { setTaxRate(e.target.value); save({ taxRate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="5" step="0.1" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Home Insurance ($/yr)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={insurance} onChange={e => { setInsurance(e.target.value); save({ insurance: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Maximum Home Price (36% DTI)</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(moderate.maxHome)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Max loan: {fmt(moderate.maxLoan)} · Max payment: {fmt(moderate.maxPayment)}/mo</p>
          </div>

          <div className="space-y-3">
            {results.map(({ label, pct, maxHome, maxLoan, maxPayment, color }) => (
              <div key={label} className={`rounded-xl border p-4 ${
                color === 'green' ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
                : color === 'yellow' ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20'
                : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm font-semibold ${color === 'green' ? 'text-green-800 dark:text-green-300' : color === 'yellow' ? 'text-yellow-800 dark:text-yellow-300' : 'text-red-800 dark:text-red-300'}`}>
                      {label} ({pct}% DTI)
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Max payment: {fmt(maxPayment)}/mo</p>
                  </div>
                  <p className={`text-xl font-bold ${color === 'green' ? 'text-green-700 dark:text-green-400' : color === 'yellow' ? 'text-yellow-700 dark:text-yellow-400' : 'text-red-700 dark:text-red-400'}`}>
                    {fmt(maxHome)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-3 text-xs text-blue-800 dark:text-blue-300">
            Lenders typically require DTI under 43%. The 28/36 rule recommends housing costs under 28% and total debts under 36% of gross income.
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
