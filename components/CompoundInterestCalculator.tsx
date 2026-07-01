'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const FREQ_MAP: Record<string, number> = { daily: 365, monthly: 12, quarterly: 4, annually: 1 }

interface GrowthRow {
  year: number
  contributions: number
  interest: number
  balance: number
}

function calcGrowth(principal: number, monthlyContrib: number, annualRate: number, n: number, years: number): GrowthRow[] {
  if (years <= 0) return []
  const rows: GrowthRow[] = []
  let balance = principal
  let totalContrib = principal

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      // Compound interest on current balance
      const periods = n / 12  // compound periods in one month
      balance = balance * Math.pow(1 + annualRate / 100 / n, periods) + monthlyContrib
      totalContrib += monthlyContrib
    }
    rows.push({
      year: y,
      contributions: totalContrib,
      interest: balance - totalContrib,
      balance,
    })
  }
  return rows
}

const STORAGE_KEY = 'lc-compound'

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [monthly, setMonthly] = useState('200')
  const [rate, setRate] = useState('7')
  const [freq, setFreq] = useState('monthly')
  const [years, setYears] = useState('20')
  const [rows, setRows] = useState<GrowthRow[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.principal) setPrincipal(p.principal)
        if (p.monthly) setMonthly(p.monthly)
        if (p.rate) setRate(p.rate)
        if (p.freq) setFreq(p.freq)
        if (p.years) setYears(p.years)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const p = parseFloat(principal) || 0
  const mc = parseFloat(monthly) || 0
  const r = parseFloat(rate) || 0
  const n = FREQ_MAP[freq] || 12
  const y = parseInt(years) || 0

  useEffect(() => {
    setRows(calcGrowth(p, mc, r, n, y))
  }, [p, mc, r, n, y])

  const lastRow = rows[rows.length - 1]
  const futureValue = lastRow?.balance || p
  const totalContrib = lastRow?.contributions || p
  const totalInterest = futureValue - totalContrib
  const interestPct = futureValue > 0 ? Math.round((totalInterest / futureValue) * 100) : 0
  const contribPct = 100 - interestPct

  const maxBalance = Math.max(...rows.map(r => r.balance), 1)
  const visible = showAll ? rows : rows.slice(0, 10)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Initial Investment</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={principal} onChange={e => { setPrincipal(e.target.value); save({ principal: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Monthly Contribution</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={monthly} onChange={e => { setMonthly(e.target.value); save({ monthly: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Annual Interest Rate</label>
            <div className="relative">
              <input type="number" value={rate} onChange={e => { setRate(e.target.value); save({ rate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="50" step="0.1" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Compound Frequency</label>
            <select value={freq} onChange={e => { setFreq(e.target.value); save({ freq: e.target.value }) }} className={inputCls}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Time Period (years)</label>
            <input type="number" value={years} onChange={e => { setYears(e.target.value); save({ years: e.target.value }) }} className={inputCls} min="1" max="50" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Future Value</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(futureValue)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Interest is {interestPct}% of final value</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: 'Total Contributions', val: fmt(totalContrib), green: true },
              { label: 'Total Interest Earned', val: fmt(totalInterest), green: false },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">Contributions vs Interest Growth</p>
            <div className="space-y-1.5">
              {visible.map(row => {
                const cPct = Math.round((row.contributions / maxBalance) * 100)
                const iPct = Math.round(((row.balance - row.contributions) / maxBalance) * 100)
                return (
                  <div key={row.year} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-8 shrink-0 text-right">Y{row.year}</span>
                    <div className="flex-1 flex h-4 rounded-sm overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <div className="bg-blue-400" style={{ width: `${cPct}%` }} />
                      <div className="bg-green-500" style={{ width: `${Math.max(0, iPct)}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-20 text-right">{fmt(row.balance)}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" />Contributions</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />Interest</span>
            </div>
            {rows.length > 10 && (
              <button onClick={() => setShowAll(!showAll)} className="mt-2 text-xs text-green-700 dark:text-green-400 hover:underline">
                {showAll ? 'Show less' : `Show all ${rows.length} years`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Year-by-year table */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-[#e2e8f0] mb-3">Year-by-Year Growth</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 text-xs uppercase">
                <th className="px-4 py-3 text-left font-semibold">Year</th>
                <th className="px-4 py-3 text-right font-semibold">Contributions</th>
                <th className="px-4 py-3 text-right font-semibold">Interest</th>
                <th className="px-4 py-3 text-right font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {visible.map(row => (
                <tr key={row.year} className="bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-colors">
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-medium">{row.year}</td>
                  <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400">{fmt(row.contributions)}</td>
                  <td className="px-4 py-2.5 text-right text-green-600 dark:text-green-400">{fmt(row.interest)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-gray-800 dark:text-[#e2e8f0]">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > 10 && (
          <button onClick={() => setShowAll(!showAll)} className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium">
            {showAll ? 'Show less' : `Show all ${rows.length} years`}
          </button>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
