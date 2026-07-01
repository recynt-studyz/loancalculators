'use client'

import { useState, useEffect, useRef } from 'react'
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
    yPay += payment; yPrin += prin; yInt += interest
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

const STORAGE_KEY = 'lc-auto-loan'

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('35000')
  const [downPayment, setDownPayment] = useState('5000')
  const [tradeIn, setTradeIn] = useState('0')
  const [salesTaxRate, setSalesTaxRate] = useState('0')
  const [rate, setRate] = useState('7')
  const [termMonths, setTermMonths] = useState('60')
  const [amortRows, setAmortRows] = useState<AmortizationRow[]>([])
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.vehiclePrice) setVehiclePrice(p.vehiclePrice)
        if (p.downPayment) setDownPayment(p.downPayment)
        if (p.tradeIn) setTradeIn(p.tradeIn)
        if (p.salesTaxRate) setSalesTaxRate(p.salesTaxRate)
        if (p.rate) setRate(p.rate)
        if (p.termMonths) setTermMonths(p.termMonths)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const vp = parseFloat(vehiclePrice) || 0
  const dp = parseFloat(downPayment) || 0
  const ti = parseFloat(tradeIn) || 0
  const taxPct = parseFloat(salesTaxRate) || 0
  const taxAmount = vp * taxPct / 100
  const loanAmt = Math.max(0, vp + taxAmount - dp - ti)
  const r = parseFloat(rate) || 0
  const months = parseInt(termMonths)

  const monthlyPayment = loanAmt > 0 && months > 0 ? calcPayment(loanAmt, r, months) : 0
  const totalLoanCost = monthlyPayment * months
  const totalInterest = totalLoanCost - loanAmt

  // National average new car rate ~7% (2026)
  const avgRate = 7.0
  const rateComparison = r <= avgRate
    ? `Your rate (${r}%) is at or below the national average (${avgRate}%). Good deal!`
    : `Your rate (${r}%) is above the national average (${avgRate}%). Consider shopping for better financing.`

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setAmortRows(buildAmort(loanAmt, r, months))
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [loanAmt, r, months])

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Vehicle Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={vehiclePrice} onChange={e => { setVehiclePrice(e.target.value); save({ vehiclePrice: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Down Payment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={downPayment} onChange={e => { setDownPayment(e.target.value); save({ downPayment: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Trade-in Value</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={tradeIn} onChange={e => { setTradeIn(e.target.value); save({ tradeIn: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>
          <div>
            <label className={labelCls}>Sales Tax Rate</label>
            <div className="relative">
              <input type="number" value={salesTaxRate} onChange={e => { setSalesTaxRate(e.target.value); save({ salesTaxRate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="20" step="0.1" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
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
              <input type="number" value={rate} onChange={e => { setRate(e.target.value); save({ rate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="50" step="0.1" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Loan Term</label>
            <select value={termMonths} onChange={e => { setTermMonths(e.target.value); save({ termMonths: e.target.value }) }} className={inputCls}>
              {[24, 36, 48, 60, 72, 84].map(m => <option key={m} value={m}>{m} months ({m / 12} yr{m / 12 > 1 ? 's' : ''})</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Monthly Payment</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(monthlyPayment)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Payoff: {payoffDate(months)}</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: 'Amount Financed', val: fmt(loanAmt) },
              { label: 'Sales Tax', val: fmt(taxAmount) },
              { label: 'Total Loan Cost', val: fmt(totalLoanCost) },
              { label: 'Total Interest', val: fmt(totalInterest), red: true },
            ].map(({ label, val, red }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-medium ${red ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
              </div>
            ))}
          </div>
          <div className={`rounded-xl border p-3 text-sm ${r <= avgRate ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300' : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300'}`}>
            {r <= avgRate ? '✓' : '⚠'} {rateComparison}
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
