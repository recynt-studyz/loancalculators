'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

interface YearRow { age: number; balance: number; contributions: number; interest: number }

function calcRetirement(
  currentAge: number, retirementAge: number, currentSavings: number,
  monthlyContrib: number, employerMatchPct: number, salaryPct: number, salary: number,
  annualReturn: number, inflationRate: number
): YearRow[] {
  const years = Math.max(0, retirementAge - currentAge)
  const rows: YearRow[] = []
  let balance = currentSavings
  let totalContrib = currentSavings
  const employerMatch = Math.min(employerMatchPct / 100, salaryPct / 100) * salary / 12
  const totalMonthly = monthlyContrib + employerMatch
  const monthlyReturn = annualReturn / 100 / 12

  for (let y = 1; y <= years; y++) {
    let yearInterest = 0
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyReturn
      yearInterest += interest
      balance = balance + interest + totalMonthly
      totalContrib += totalMonthly
    }
    rows.push({ age: currentAge + y, balance, contributions: totalContrib, interest: balance - totalContrib })
  }
  return rows
}

const STORAGE_KEY = 'lc-retirement'

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('30')
  const [retirementAge, setRetirementAge] = useState('65')
  const [currentSavings, setCurrentSavings] = useState('25000')
  const [monthlyContrib, setMonthlyContrib] = useState('500')
  const [employerMatch, setEmployerMatch] = useState('3')
  const [salaryPct, setSalaryPct] = useState('6')
  const [salary, setSalary] = useState('75000')
  const [annualReturn, setAnnualReturn] = useState('7')
  const [inflation, setInflation] = useState('3')
  const [rows, setRows] = useState<YearRow[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.currentAge) setCurrentAge(p.currentAge)
        if (p.retirementAge) setRetirementAge(p.retirementAge)
        if (p.currentSavings) setCurrentSavings(p.currentSavings)
        if (p.monthlyContrib) setMonthlyContrib(p.monthlyContrib)
        if (p.employerMatch) setEmployerMatch(p.employerMatch)
        if (p.salary) setSalary(p.salary)
        if (p.annualReturn) setAnnualReturn(p.annualReturn)
        if (p.inflation) setInflation(p.inflation)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const ca = parseInt(currentAge) || 30
  const ra = parseInt(retirementAge) || 65
  const cs = parseFloat(currentSavings) || 0
  const mc = parseFloat(monthlyContrib) || 0
  const em = parseFloat(employerMatch) || 0
  const sp = parseFloat(salaryPct) || 6
  const sal = parseFloat(salary) || 0
  const ar = parseFloat(annualReturn) || 7
  const inf = parseFloat(inflation) || 3
  const years = Math.max(0, ra - ca)

  useEffect(() => {
    setRows(calcRetirement(ca, ra, cs, mc, em, sp, sal, ar, inf))
  }, [ca, ra, cs, mc, em, sp, sal, ar, inf])

  const lastRow = rows[rows.length - 1]
  const projectedBalance = lastRow?.balance || cs
  const inflationAdj = projectedBalance / Math.pow(1 + inf / 100, years)
  const monthlyIncome4Pct = (projectedBalance * 0.04) / 12
  const inflationAdjMonthly = (inflationAdj * 0.04) / 12
  const yearsLast = projectedBalance / (monthlyIncome4Pct * 12)

  const maxBalance = Math.max(...rows.map(r => r.balance), 1)
  const visible = showAll ? rows : rows.slice(0, 10)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Current Age</label>
              <input type="number" value={currentAge} onChange={e => { setCurrentAge(e.target.value); save({ currentAge: e.target.value }) }} className={inputCls} min="18" max="80" />
            </div>
            <div>
              <label className={labelCls}>Retirement Age</label>
              <input type="number" value={retirementAge} onChange={e => { setRetirementAge(e.target.value); save({ retirementAge: e.target.value }) }} className={inputCls} min="40" max="90" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Current Savings</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={currentSavings} onChange={e => { setCurrentSavings(e.target.value); save({ currentSavings: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Monthly Contribution</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={monthlyContrib} onChange={e => { setMonthlyContrib(e.target.value); save({ monthlyContrib: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Annual Salary</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={salary} onChange={e => { setSalary(e.target.value); save({ salary: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Employer Match</label>
              <div className="relative">
                <input type="number" value={employerMatch} onChange={e => { setEmployerMatch(e.target.value); save({ employerMatch: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="20" step="0.5" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Up to (% of salary)</label>
              <div className="relative">
                <input type="number" value={salaryPct} onChange={e => { setSalaryPct(e.target.value); save({ salaryPct: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="20" step="0.5" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Expected Return</label>
              <div className="relative">
                <input type="number" value={annualReturn} onChange={e => { setAnnualReturn(e.target.value); save({ annualReturn: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="30" step="0.5" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Inflation Rate</label>
              <div className="relative">
                <input type="number" value={inflation} onChange={e => { setInflation(e.target.value); save({ inflation: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="20" step="0.5" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Projected Balance at {ra}</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(projectedBalance)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">{years} years of growth</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: `Inflation-Adjusted Value (today's $)`, val: fmt(inflationAdj) },
              { label: 'Monthly Income (4% rule)', val: fmt(monthlyIncome4Pct) },
              { label: "Inflation-adj. Monthly Income", val: fmt(inflationAdjMonthly) },
              { label: 'Years savings will last', val: yearsLast > 40 ? '40+ years' : `${yearsLast.toFixed(0)} years` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">Growth Projection</p>
            <div className="space-y-1.5">
              {visible.map(row => (
                <div key={row.age} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-8 shrink-0 text-right">A{row.age}</span>
                  <div className="flex-1 flex h-3 rounded-sm overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="bg-blue-400" style={{ width: `${Math.round((row.contributions / maxBalance) * 100)}%` }} />
                    <div className="bg-green-500" style={{ width: `${Math.round((row.interest / maxBalance) * 100)}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-20 text-right">{fmt(row.balance)}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" />Contributions</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-year table */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-[#e2e8f0] mb-3">Year-by-Year Projection</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 text-xs uppercase">
                <th className="px-4 py-3 text-left font-semibold">Age</th>
                <th className="px-4 py-3 text-right font-semibold">Contributions</th>
                <th className="px-4 py-3 text-right font-semibold">Returns</th>
                <th className="px-4 py-3 text-right font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {visible.map(row => (
                <tr key={row.age} className="bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-colors">
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-medium">{row.age}</td>
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
