'use client'

import { useState, useEffect } from 'react'

const fmtMoney = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

// 2026 federal tax brackets (single filer)
function calcFederalTax(annual: number, status: string): number {
  const deduction = status === 'married' ? 30000 : 15000
  const taxable = Math.max(0, annual - deduction)

  const bracketsSingle = [
    [11925, 0.10],
    [48475, 0.12],
    [103350, 0.22],
    [197300, 0.24],
    [250525, 0.32],
    [626350, 0.35],
    [Infinity, 0.37],
  ]
  const bracketsMarried = [
    [23850, 0.10],
    [96950, 0.12],
    [206700, 0.22],
    [394600, 0.24],
    [501050, 0.32],
    [751600, 0.35],
    [Infinity, 0.37],
  ]
  const brackets = status === 'married' ? bracketsMarried : bracketsSingle

  let tax = 0
  let prev = 0
  for (const [limit, rate] of brackets) {
    const lim = limit as number
    if (taxable <= prev) break
    const chunk = Math.min(taxable, lim) - prev
    tax += chunk * (rate as number)
    prev = lim
    if (lim === Infinity) break
  }
  return tax
}

const STORAGE_KEY = 'lc-salary'

export default function SalaryCalculator() {
  const [activeField, setActiveField] = useState<string | null>(null)
  const [hourly, setHourly] = useState('')
  const [daily, setDaily] = useState('')
  const [weekly, setWeekly] = useState('')
  const [biweekly, setBiweekly] = useState('')
  const [semimonthly, setSemimonthly] = useState('')
  const [monthly, setMonthly] = useState('')
  const [annual, setAnnual] = useState('75000')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [weeksPerYear, setWeeksPerYear] = useState('52')
  const [vacationDays, setVacationDays] = useState('10')
  const [filingStatus, setFilingStatus] = useState('single')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.annual) setAnnual(p.annual)
        if (p.hoursPerWeek) setHoursPerWeek(p.hoursPerWeek)
        if (p.weeksPerYear) setWeeksPerYear(p.weeksPerYear)
        if (p.vacationDays) setVacationDays(p.vacationDays)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const hpw = parseFloat(hoursPerWeek) || 40
  const wpy = parseFloat(weeksPerYear) || 52
  const vd = parseFloat(vacationDays) || 0
  const workingDaysPerYear = wpy * 5 - vd
  const workingHoursPerYear = workingDaysPerYear * (hpw / 5)

  function computeAll(base: number, field: string) {
    const ann = field === 'annual' ? base
      : field === 'monthly' ? base * 12
      : field === 'semimonthly' ? base * 24
      : field === 'biweekly' ? base * 26
      : field === 'weekly' ? base * wpy
      : field === 'daily' ? base * workingDaysPerYear
      : base * workingHoursPerYear // hourly
    return {
      annual: ann,
      monthly: ann / 12,
      semimonthly: ann / 24,
      biweekly: ann / 26,
      weekly: ann / wpy,
      daily: ann / workingDaysPerYear,
      hourly: ann / workingHoursPerYear,
    }
  }

  const annualValue = parseFloat(annual) || 0
  const derived = computeAll(annualValue, 'annual')

  const federalTax = calcFederalTax(annualValue, filingStatus)
  const fica = annualValue * 0.062 // SS up to $176,100
  const medicare = annualValue * 0.0145
  const netAnnual = annualValue - federalTax - fica - medicare

  function handleChange(field: string, val: string) {
    setActiveField(field)
    const num = parseFloat(val) || 0
    const all = computeAll(num, field)
    setHourly(num && field === 'hourly' ? val : all.hourly.toFixed(2))
    setDaily(num && field === 'daily' ? val : all.daily.toFixed(2))
    setWeekly(num && field === 'weekly' ? val : all.weekly.toFixed(2))
    setBiweekly(num && field === 'biweekly' ? val : all.biweekly.toFixed(2))
    setSemimonthly(num && field === 'semimonthly' ? val : all.semimonthly.toFixed(2))
    setMonthly(num && field === 'monthly' ? val : all.monthly.toFixed(2))
    setAnnual(num && field === 'annual' ? val : all.annual.toFixed(2))
    if (field === 'annual') save({ annual: val })
  }

  // Initialize derived values
  useEffect(() => {
    if (annualValue > 0 && activeField === null) {
      handleChange('annual', annual)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annualValue, hpw, wpy, vd])

  const inputCls = 'flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'w-28 shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300'

  const fields = [
    { label: 'Annual', field: 'annual', val: annual, set: setAnnual },
    { label: 'Monthly', field: 'monthly', val: monthly, set: setMonthly },
    { label: 'Semi-monthly', field: 'semimonthly', val: semimonthly, set: setSemimonthly },
    { label: 'Biweekly', field: 'biweekly', val: biweekly, set: setBiweekly },
    { label: `Weekly (${wpy} wks)`, field: 'weekly', val: weekly, set: setWeekly },
    { label: `Daily (${workingDaysPerYear} days)`, field: 'daily', val: daily, set: setDaily },
    { label: `Hourly (${hpw} hrs)`, field: 'hourly', val: hourly, set: setHourly },
  ]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter your pay in any field — all others update instantly.</p>
          <div className="space-y-2">
            {fields.map(({ label, field, val }) => (
              <div key={field} className="flex items-center gap-3">
                <span className={labelCls}>{label}</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={val}
                    onChange={e => handleChange(field, e.target.value)}
                    onFocus={() => setActiveField(field)}
                    className={`${inputCls} pl-7`}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hrs/week</label>
                <input type="number" value={hoursPerWeek} onChange={e => { setHoursPerWeek(e.target.value); save({ hoursPerWeek: e.target.value }); if (annual) handleChange('annual', annual) }} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-2 focus:ring-green-500" min="1" max="168" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Wks/year</label>
                <input type="number" value={weeksPerYear} onChange={e => { setWeeksPerYear(e.target.value); save({ weeksPerYear: e.target.value }); if (annual) handleChange('annual', annual) }} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-2 focus:ring-green-500" min="1" max="52" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Vacation days</label>
                <input type="number" value={vacationDays} onChange={e => { setVacationDays(e.target.value); save({ vacationDays: e.target.value }); if (annual) handleChange('annual', annual) }} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-2 focus:ring-green-500" min="0" max="365" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Filing Status (for tax estimate)</label>
              <select value={filingStatus} onChange={e => { setFilingStatus(e.target.value); save({ filingStatus: e.target.value }) }} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Annual Salary</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmtMoney(annualValue)}</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">After Federal Taxes (estimate)</p>
            <div className="space-y-2">
              {[
                { label: 'Gross Annual', val: fmtMoney(annualValue) },
                { label: 'Federal Income Tax', val: `-${fmtMoney(federalTax)}`, red: true },
                { label: 'Social Security (6.2%)', val: `-${fmtMoney(fica)}`, red: true },
                { label: 'Medicare (1.45%)', val: `-${fmtMoney(medicare)}`, red: true },
                { label: 'Net Annual', val: fmtMoney(netAnnual), bold: true },
                { label: 'Net Monthly', val: fmtMoney(netAnnual / 12) },
                { label: 'Net Biweekly', val: fmtMoney(netAnnual / 26) },
              ].map(({ label, val, red, bold }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2 mt-1' : ''}`}>
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className={`font-medium ${red ? 'text-red-600 dark:text-red-400' : bold ? 'text-green-700 dark:text-green-400 text-base' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Estimate only. Actual tax depends on deductions, filing status, and state taxes.</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
