'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

function monthsToGoal(goal: number, current: number, monthly: number, annualRate: number): number {
  const r = annualRate / 100 / 12
  const needed = goal - current
  if (needed <= 0) return 0
  if (monthly <= 0 && r === 0) return Infinity
  if (r === 0) return Math.ceil(needed / monthly)
  // FV = current*(1+r)^n + monthly*((1+r)^n - 1)/r = goal
  // Solve for n numerically
  if (monthly === 0) {
    return Math.ceil(Math.log(goal / current) / Math.log(1 + r))
  }
  // n = log((goal*r + monthly) / (current*r + monthly)) / log(1+r)
  const num = (goal * r + monthly)
  const den = (current * r + monthly)
  if (den <= 0) return Infinity
  return Math.ceil(Math.log(num / den) / Math.log(1 + r))
}

function requiredMonthly(goal: number, current: number, months: number, annualRate: number): number {
  const r = annualRate / 100 / 12
  if (months <= 0) return Infinity
  const fvCurrent = current * Math.pow(1 + r, months)
  const needed = goal - fvCurrent
  if (needed <= 0) return 0
  if (r === 0) return needed / months
  return needed * r / (Math.pow(1 + r, months) - 1)
}

function reachDate(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + Math.round(months))
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const STORAGE_KEY = 'lc-savings'

export default function SavingsCalculator() {
  const [mode, setMode] = useState<'howLong' | 'howMuch'>('howLong')
  const [goal, setGoal] = useState('50000')
  const [current, setCurrent] = useState('5000')
  const [monthly, setMonthly] = useState('500')
  const [rate, setRate] = useState('4.5')
  const [targetMonths, setTargetMonths] = useState('60')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.goal) setGoal(p.goal)
        if (p.current) setCurrent(p.current)
        if (p.monthly) setMonthly(p.monthly)
        if (p.rate) setRate(p.rate)
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

  const g = parseFloat(goal) || 0
  const c = parseFloat(current) || 0
  const m = parseFloat(monthly) || 0
  const r = parseFloat(rate) || 0
  const tm = parseInt(targetMonths) || 60

  const months = mode === 'howLong' ? monthsToGoal(g, c, m, r) : tm
  const reqMonthly = mode === 'howMuch' ? requiredMonthly(g, c, tm, r) : m

  const calcMonths = mode === 'howLong' ? months : tm
  const totalContrib = c + (mode === 'howLong' ? m : reqMonthly) * (isFinite(calcMonths) ? calcMonths : 0)
  const totalInterest = Math.max(0, g - totalContrib)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const yrsMos = (mos: number) => {
    const yrs = Math.floor(mos / 12)
    const mo = mos % 12
    if (yrs === 0) return `${mo} months`
    if (mo === 0) return `${yrs} year${yrs > 1 ? 's' : ''}`
    return `${yrs} year${yrs > 1 ? 's' : ''} ${mo} month${mo > 1 ? 's' : ''}`
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 max-w-sm">
          <button onClick={() => setMode('howLong')} className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'howLong' ? 'bg-green-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400'}`}>How long to reach goal?</button>
          <button onClick={() => setMode('howMuch')} className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'howMuch' ? 'bg-green-600 text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400'}`}>How much to save monthly?</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Savings Goal</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={goal} onChange={e => { setGoal(e.target.value); save({ goal: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Current Savings</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={current} onChange={e => { setCurrent(e.target.value); save({ current: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          {mode === 'howLong' ? (
            <div>
              <label className={labelCls}>Monthly Contribution</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={monthly} onChange={e => { setMonthly(e.target.value); save({ monthly: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Time to Reach Goal (months)</label>
              <input type="number" value={targetMonths} onChange={e => { setTargetMonths(e.target.value); save({ targetMonths: e.target.value }) }} className={inputCls} min="1" max="600" />
            </div>
          )}
          <div>
            <label className={labelCls}>Annual Interest Rate</label>
            <div className="relative">
              <input type="number" value={rate} onChange={e => { setRate(e.target.value); save({ rate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="30" step="0.1" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            {mode === 'howLong' ? (
              <>
                <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Time to Reach Goal</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                  {isFinite(months) ? yrsMos(months) : 'Never (increase contribution)'}
                </p>
                {isFinite(months) && <p className="text-xs text-green-600 dark:text-green-500 mt-1">Reach goal by: {reachDate(months)}</p>}
              </>
            ) : (
              <>
                <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Required Monthly Savings</p>
                <p className="text-4xl font-bold text-green-700 dark:text-green-300">{isFinite(reqMonthly) ? fmt(reqMonthly) : '—'}</p>
                <p className="text-xs text-green-600 dark:text-green-500 mt-1">Reach goal by: {reachDate(tm)}</p>
              </>
            )}
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: 'Savings Goal', val: fmt(g) },
              { label: 'Total Contributions', val: fmt(totalContrib) },
              { label: 'Interest Earned', val: fmt(totalInterest) },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
