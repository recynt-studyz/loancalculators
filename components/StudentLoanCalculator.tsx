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

const PLANS = [
  { value: 'standard', label: 'Standard (10 years)', months: 120 },
  { value: 'graduated', label: 'Graduated (10 years)', months: 120 },
  { value: 'extended', label: 'Extended (25 years)', months: 300 },
  { value: 'ibr', label: 'Income-Based (20 years)', months: 240 },
]

const STORAGE_KEY = 'lc-student-loan'

export default function StudentLoanCalculator() {
  const [balance, setBalance] = useState('35000')
  const [rate, setRate] = useState('6.5')
  const [loanType, setLoanType] = useState<'federal' | 'private'>('federal')
  const [plan, setPlan] = useState('standard')
  const [privatePayment, setPrivatePayment] = useState('400')
  const [amortRows, setAmortRows] = useState<AmortizationRow[]>([])
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.balance) setBalance(p.balance)
        if (p.rate) setRate(p.rate)
        if (p.plan) setPlan(p.plan)
        if (p.privatePayment) setPrivatePayment(p.privatePayment)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const principal = parseFloat(balance) || 0
  const r = parseFloat(rate) || 0

  const selectedPlan = PLANS.find(p => p.value === plan) || PLANS[0]
  const months = loanType === 'federal' ? selectedPlan.months : 0

  const federalPayment = principal > 0 && months > 0 ? calcPayment(principal, r, months) : 0
  const privPay = parseFloat(privatePayment) || 0

  // For private: calculate months to payoff
  const r12 = r / 100 / 12
  const privateMonths = loanType === 'private' && privPay > 0 && r12 > 0 && privPay > principal * r12
    ? Math.ceil(-Math.log(1 - (principal * r12 / privPay)) / Math.log(1 + r12))
    : loanType === 'private' && privPay > 0 && r === 0
      ? Math.ceil(principal / privPay)
      : 0

  const monthlyPayment = loanType === 'federal' ? federalPayment : privPay
  const calcMonths = loanType === 'federal' ? months : privateMonths
  const totalPaid = loanType === 'federal' ? federalPayment * months : privPay * privateMonths
  const totalInterest = totalPaid - principal

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (loanType === 'federal') {
        setAmortRows(buildAmort(principal, r, months))
      } else {
        setAmortRows(buildAmort(principal, r, privateMonths))
      }
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [principal, r, months, privateMonths, loanType])

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Loan Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={balance} onChange={e => { setBalance(e.target.value); save({ balance: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
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
            <label className={labelCls}>Loan Type</label>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              {(['federal', 'private'] as const).map(t => (
                <button key={t} onClick={() => setLoanType(t)}
                  className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${loanType === t ? 'bg-green-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          {loanType === 'federal' ? (
            <div>
              <label className={labelCls}>Repayment Plan</label>
              <select value={plan} onChange={e => { setPlan(e.target.value); save({ plan: e.target.value }) }} className={inputCls}>
                {PLANS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Monthly Payment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={privatePayment} onChange={e => { setPrivatePayment(e.target.value); save({ privatePayment: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Monthly Payment</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(monthlyPayment)}</p>
            {calcMonths > 0 && <p className="text-xs text-green-600 dark:text-green-500 mt-1">Payoff: {payoffDate(calcMonths)}</p>}
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: 'Total Paid', val: fmt(totalPaid) },
              { label: 'Total Interest', val: fmt(Math.max(0, totalInterest)), red: true },
              { label: 'Payoff Timeline', val: calcMonths > 0 ? `${Math.ceil(calcMonths / 12)} years ${calcMonths % 12} months` : '—' },
            ].map(({ label, val, red }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-medium ${red ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
              </div>
            ))}
          </div>
          {loanType === 'federal' && (
            <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-3 text-xs text-blue-800 dark:text-blue-300">
              Federal loans may qualify for forgiveness programs. This calculator estimates standard repayment only.
            </div>
          )}
        </div>
      </div>
      <AmortizationTable rows={amortRows} />
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
