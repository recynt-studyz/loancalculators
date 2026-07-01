'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import AmortizationTable, { AmortizationRow } from './AmortizationTable'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

function calcPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months
  const r = annualRate / 100 / 12
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

function buildAmort(principal: number, annualRate: number, months: number): AmortizationRow[] {
  if (principal <= 0 || months <= 0) return []
  const r = annualRate === 0 ? 0 : annualRate / 100 / 12
  const payment = calcPayment(principal, annualRate, months)
  let balance = principal
  const rows: AmortizationRow[] = []
  let yPay = 0, yPrin = 0, yInt = 0
  for (let m = 1; m <= months; m++) {
    const interest = balance * r
    const prin = Math.min(payment - interest, balance)
    balance = Math.max(0, balance - prin)
    yPay += payment
    yPrin += prin
    yInt += interest
    if (m % 12 === 0 || m === months) {
      rows.push({ year: Math.ceil(m / 12), totalPayment: yPay, totalPrincipal: yPrin, totalInterest: yInt, endBalance: balance })
      yPay = 0; yPrin = 0; yInt = 0
    }
  }
  return rows
}

function payoffDate(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + Math.round(months))
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const STORAGE_KEY = 'lc-mortgage'

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('400000')
  const [downDollar, setDownDollar] = useState('80000')
  const [downPct, setDownPct] = useState('20')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')
  const [tax, setTax] = useState('4800')
  const [insurance, setInsurance] = useState('1500')
  const [hoa, setHoa] = useState('0')
  const [amortRows, setAmortRows] = useState<AmortizationRow[]>([])
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.homePrice) setHomePrice(p.homePrice)
        if (p.downDollar) setDownDollar(p.downDollar)
        if (p.downPct) setDownPct(p.downPct)
        if (p.rate) setRate(p.rate)
        if (p.term) setTerm(p.term)
        if (p.tax) setTax(p.tax)
        if (p.insurance) setInsurance(p.insurance)
        if (p.hoa) setHoa(p.hoa)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const hp = parseFloat(homePrice) || 0
  const dd = parseFloat(downDollar) || 0
  const loanAmt = Math.max(0, hp - dd)
  const pct = parseFloat(downPct) || 0
  const r = parseFloat(rate) || 0
  const months = parseInt(term) * 12
  const pmiActive = hp > 0 && (dd / hp) * 100 < 20

  const monthlyPI = loanAmt > 0 && months > 0 ? calcPayment(loanAmt, r, months) : 0
  const monthlyTax = (parseFloat(tax) || 0) / 12
  const monthlyIns = (parseFloat(insurance) || 0) / 12
  const monthlyPMI = pmiActive ? (loanAmt * 0.005) / 12 : 0
  const monthlyHOA = parseFloat(hoa) || 0
  const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyPMI + monthlyHOA

  const totalLoanCost = monthlyPI * months
  const totalInterest = totalLoanCost - loanAmt
  const piPct = totalLoanCost > 0 ? Math.round((loanAmt / totalLoanCost) * 100) : 0
  const intPct = 100 - piPct

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setAmortRows(buildAmort(loanAmt, r, months))
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [loanAmt, r, months])

  const handleHomePrice = (v: string) => {
    setHomePrice(v)
    const hp2 = parseFloat(v) || 0
    const dp = parseFloat(downDollar) || 0
    if (hp2 > 0) setDownPct(((dp / hp2) * 100).toFixed(1))
    save({ homePrice: v })
  }
  const handleDownDollar = (v: string) => {
    setDownDollar(v)
    const hp2 = parseFloat(homePrice) || 0
    const dp = parseFloat(v) || 0
    if (hp2 > 0) setDownPct(((dp / hp2) * 100).toFixed(1))
    save({ downDollar: v })
  }
  const handleDownPct = (v: string) => {
    setDownPct(v)
    const hp2 = parseFloat(homePrice) || 0
    const p = parseFloat(v) || 0
    const dd2 = Math.round(hp2 * p / 100).toString()
    setDownDollar(dd2)
    save({ downPct: v, downDollar: dd2 })
  }

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Home Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={homePrice} onChange={e => handleHomePrice(e.target.value)} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Down Payment</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={downDollar} onChange={e => handleDownDollar(e.target.value)} className={`${inputCls} pl-7`} min="0" />
              </div>
              <div className="relative w-24">
                <input type="number" value={downPct} onChange={e => handleDownPct(e.target.value)} className={`${inputCls} pr-7`} min="0" max="100" step="0.1" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
          <div>
            <label className={labelCls}>Loan Amount (calculated)</label>
            <div className="px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 text-sm font-medium">
              {fmt(loanAmt)}
            </div>
          </div>
          <div>
            <label className={labelCls}>Interest Rate</label>
            <div className="relative">
              <input type="number" value={rate} onChange={e => { setRate(e.target.value); save({ rate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="30" step="0.1" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Loan Term</label>
            <select value={term} onChange={e => { setTerm(e.target.value); save({ term: e.target.value }) }} className={inputCls}>
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Property Tax ($/yr)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={tax} onChange={e => { setTax(e.target.value); save({ tax: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Home Insurance ($/yr)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={insurance} onChange={e => { setInsurance(e.target.value); save({ insurance: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>HOA ($/mo)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={hoa} onChange={e => { setHoa(e.target.value); save({ hoa: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div className="flex items-end">
              {pmiActive && (
                <div className="w-full px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs">
                  PMI active: {fmt(monthlyPMI)}/mo<br />
                  <span className="opacity-70">Put 20% down to remove</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Monthly Payment</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(totalMonthly)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Payoff: {payoffDate(months)}</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Monthly Breakdown</p>
            {[
              { label: 'Principal & Interest', val: monthlyPI },
              { label: 'Property Tax', val: monthlyTax },
              { label: 'Home Insurance', val: monthlyIns },
              { label: 'PMI', val: monthlyPMI },
              { label: 'HOA', val: monthlyHOA },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(val)}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Loan Cost</span>
              <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(totalLoanCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Interest Paid</span>
              <span className="font-medium text-red-600 dark:text-red-400">{fmt(totalInterest)}</span>
            </div>
          </div>

          {/* Visual bar */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Principal vs Interest (lifetime)</p>
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="bg-green-500" style={{ width: `${piPct}%` }} title={`Principal ${piPct}%`} />
              <div className="bg-red-400" style={{ width: `${intPct}%` }} title={`Interest ${intPct}%`} />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />Principal {piPct}%</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" />Interest {intPct}%</span>
            </div>
          </div>
        </div>
      </div>

      <AmortizationTable rows={amortRows} />

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
