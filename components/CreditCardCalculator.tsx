'use client'

import { useState, useEffect, useRef } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

function payoffMonths(balance: number, apr: number, payment: number): number {
  const r = apr / 100 / 12
  if (r === 0) return payment > 0 ? Math.ceil(balance / payment) : 0
  if (payment <= balance * r) return Infinity
  return Math.ceil(-Math.log(1 - (balance * r / payment)) / Math.log(1 + r))
}

function requiredPayment(balance: number, apr: number, months: number): number {
  const r = apr / 100 / 12
  if (r === 0) return balance / months
  return (balance * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

function payoffDate(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + Math.round(months))
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

interface PayoffRow { month: number; payment: number; interest: number; principal: number; balance: number }

function buildSchedule(balance: number, apr: number, payment: number, maxMonths: number): PayoffRow[] {
  const r = apr / 100 / 12
  const rows: PayoffRow[] = []
  let bal = balance
  for (let m = 1; m <= maxMonths && bal > 0.01; m++) {
    const interest = bal * r
    const prin = Math.min(payment - interest, bal)
    bal = Math.max(0, bal - prin)
    rows.push({ month: m, payment, interest, principal: prin, balance: bal })
  }
  return rows
}

const STORAGE_KEY = 'lc-credit-card'

export default function CreditCardCalculator() {
  const [balance, setBalance] = useState('5000')
  const [apr, setApr] = useState('22.99')
  const [mode, setMode] = useState<'payment' | 'months'>('payment')
  const [payment, setPayment] = useState('150')
  const [targetMonths, setTargetMonths] = useState('36')
  const [schedule, setSchedule] = useState<PayoffRow[]>([])
  const [showSchedule, setShowSchedule] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.balance) setBalance(p.balance)
        if (p.apr) setApr(p.apr)
        if (p.payment) setPayment(p.payment)
        if (p.targetMonths) setTargetMonths(p.targetMonths)
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
  const aprVal = parseFloat(apr) || 0
  const paymentVal = parseFloat(payment) || 0
  const targetMos = parseInt(targetMonths) || 36

  const calcPayment = mode === 'payment' ? paymentVal : requiredPayment(bal, aprVal, targetMos)
  const months = mode === 'payment' ? payoffMonths(bal, aprVal, paymentVal) : targetMos
  const totalPaid = isFinite(months) ? calcPayment * months : 0
  const totalInterest = isFinite(months) ? totalPaid - bal : 0

  // +$50/mo comparison
  const extraPayment = calcPayment + 50
  const extraMonths = mode === 'payment' ? payoffMonths(bal, aprVal, extraPayment) : payoffMonths(bal, aprVal, extraPayment)
  const extraTotalPaid = isFinite(extraMonths) ? extraPayment * extraMonths : 0
  const extraSavedMonths = isFinite(months) && isFinite(extraMonths) ? months - extraMonths : 0
  const extraSavedInterest = isFinite(months) ? totalInterest - (extraTotalPaid - bal) : 0

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (isFinite(months) && months > 0) {
        setSchedule(buildSchedule(bal, aprVal, calcPayment, months))
      } else {
        setSchedule([])
      }
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [bal, aprVal, calcPayment, months])

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Current Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={balance} onChange={e => { setBalance(e.target.value); save({ balance: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Annual Interest Rate (APR)</label>
            <div className="relative">
              <input type="number" value={apr} onChange={e => { setApr(e.target.value); save({ apr: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="100" step="0.01" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Calculate by</label>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              <button onClick={() => setMode('payment')} className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'payment' ? 'bg-green-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Monthly Payment</button>
              <button onClick={() => setMode('months')} className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'months' ? 'bg-green-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Pay off in X months</button>
            </div>
          </div>
          {mode === 'payment' ? (
            <div>
              <label className={labelCls}>Monthly Payment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={payment} onChange={e => { setPayment(e.target.value); save({ payment: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Pay off in (months)</label>
              <input type="number" value={targetMonths} onChange={e => { setTargetMonths(e.target.value); save({ targetMonths: e.target.value }) }} className={inputCls} min="1" max="360" />
            </div>
          )}
        </div>

        <div className="space-y-4">
          {isFinite(months) && months > 0 ? (
            <>
              <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
                {mode === 'payment' ? (
                  <>
                    <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Months to Pay Off</p>
                    <p className="text-4xl font-bold text-green-700 dark:text-green-300">{months} months</p>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-1">Payoff: {payoffDate(months)}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Required Monthly Payment</p>
                    <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(calcPayment)}</p>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-1">Payoff: {payoffDate(targetMos)}</p>
                  </>
                )}
              </div>
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
                {[
                  { label: 'Total Paid', val: fmt(totalPaid) },
                  { label: 'Total Interest', val: fmt(totalInterest), red: true },
                ].map(({ label, val, red }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{label}</span>
                    <span className={`font-medium ${red ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                  </div>
                ))}
              </div>
              {extraSavedMonths > 0 && (
                <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">If you pay {fmt(extraPayment)}/mo (+$50):</p>
                  <div className="space-y-1.5 text-sm text-blue-700 dark:text-blue-400">
                    <div>Save {extraSavedMonths} months</div>
                    <div>Save {fmt(Math.max(0, extraSavedInterest))} in interest</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5 text-red-700 dark:text-red-400">
              Your monthly payment is too low to pay off this balance. Increase your payment above {fmt(bal * (aprVal / 100 / 12))}/mo.
            </div>
          )}
        </div>
      </div>

      {schedule.length > 0 && (
        <div className="mt-6">
          <button onClick={() => setShowSchedule(!showSchedule)} className="text-sm text-green-700 dark:text-green-400 hover:underline font-medium mb-3">
            {showSchedule ? 'Hide' : 'Show'} month-by-month payoff schedule ({schedule.length} months)
          </button>
          {showSchedule && (
            <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 text-xs uppercase">
                    <th className="px-4 py-3 text-left font-semibold">Month</th>
                    <th className="px-4 py-3 text-right font-semibold">Payment</th>
                    <th className="px-4 py-3 text-right font-semibold">Interest</th>
                    <th className="px-4 py-3 text-right font-semibold">Principal</th>
                    <th className="px-4 py-3 text-right font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {schedule.slice(0, 24).map(row => (
                    <tr key={row.month} className="bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-[#1e293b]">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.month}</td>
                      <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmt(row.payment)}</td>
                      <td className="px-4 py-2 text-right text-red-600 dark:text-red-400">{fmt(row.interest)}</td>
                      <td className="px-4 py-2 text-right text-green-600 dark:text-green-400">{fmt(row.principal)}</td>
                      <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {schedule.length > 24 && <p className="text-xs text-gray-400 p-3">Showing first 24 of {schedule.length} months</p>}
            </div>
          )}
        </div>
      )}
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
