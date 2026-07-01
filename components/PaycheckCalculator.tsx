'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

// 2026 Federal income tax brackets
function calcFederalTax(annual: number, status: string): number {
  const stdDed = status === 'married' ? 30000 : status === 'hoh' ? 22500 : 15000
  const taxable = Math.max(0, annual - stdDed)

  const bracketsSingle = [[11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [626350, 0.35], [Infinity, 0.37]]
  const bracketsMarried = [[23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]]
  const bracketsHOH = [[17000, 0.10], [64850, 0.12], [103350, 0.22], [197300, 0.24], [250500, 0.32], [626350, 0.35], [Infinity, 0.37]]

  const brackets = status === 'married' ? bracketsMarried : status === 'hoh' ? bracketsHOH : bracketsSingle
  let tax = 0; let prev = 0
  for (const [limit, rate] of brackets) {
    const lim = limit as number
    if (taxable <= prev) break
    tax += (Math.min(taxable, lim) - prev) * (rate as number)
    prev = lim
    if (lim === Infinity) break
  }
  return tax
}

// Simplified state income tax rates (effective/approximate)
const STATE_INCOME_TAX: Record<string, number> = {
  'AL': 5.0, 'AK': 0, 'AZ': 2.5, 'AR': 4.7, 'CA': 9.3, 'CO': 4.4, 'CT': 5.0, 'DE': 5.2,
  'FL': 0, 'GA': 5.49, 'HI': 8.0, 'ID': 5.8, 'IL': 4.95, 'IN': 3.05, 'IA': 5.7, 'KS': 5.58,
  'KY': 4.0, 'LA': 4.25, 'ME': 7.15, 'MD': 5.75, 'MA': 5.0, 'MI': 4.25, 'MN': 9.85, 'MS': 5.0,
  'MO': 5.4, 'MT': 6.75, 'NE': 6.84, 'NV': 0, 'NH': 0, 'NJ': 6.37, 'NM': 5.9, 'NY': 6.85,
  'NC': 4.75, 'ND': 2.5, 'OH': 4.0, 'OK': 4.75, 'OR': 9.9, 'PA': 3.07, 'RI': 5.99, 'SC': 6.5,
  'SD': 0, 'TN': 0, 'TX': 0, 'UT': 4.65, 'VT': 8.75, 'VA': 5.75, 'WA': 0, 'WV': 6.5, 'WI': 7.65, 'WY': 0,
}

const STATES: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
}

const FREQ_PERIODS: Record<string, number> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 }

const STORAGE_KEY = 'lc-paycheck'

export default function PaycheckCalculator() {
  const [grossPay, setGrossPay] = useState('5000')
  const [frequency, setFrequency] = useState('biweekly')
  const [filingStatus, setFilingStatus] = useState('single')
  const [state, setState] = useState('TX')
  const [k401Pct, setK401Pct] = useState('6')
  const [healthIns, setHealthIns] = useState('150')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.grossPay) setGrossPay(p.grossPay)
        if (p.frequency) setFrequency(p.frequency)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.state) setState(p.state)
        if (p.k401Pct) setK401Pct(p.k401Pct)
        if (p.healthIns) setHealthIns(p.healthIns)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const gp = parseFloat(grossPay) || 0
  const periods = FREQ_PERIODS[frequency] || 26
  const annualGross = gp * periods
  const k401Amount = gp * (parseFloat(k401Pct) || 0) / 100
  const hi = parseFloat(healthIns) || 0

  // Pre-tax deductions reduce taxable income
  const annualPreTax = (k401Amount + hi) * periods
  const taxableAnnual = Math.max(0, annualGross - annualPreTax)

  const annualFederal = calcFederalTax(taxableAnnual, filingStatus)
  const federalPerPeriod = annualFederal / periods

  const stateRate = STATE_INCOME_TAX[state] || 0
  const annualState = taxableAnnual * stateRate / 100
  const statePerPeriod = annualState / periods

  const ssTaxable = Math.min(annualGross, 176100) // 2026 SS wage base
  const ssPerPeriod = Math.min(gp, 176100 / periods) * 0.062
  const medicarePerPeriod = gp * 0.0145

  const netPay = gp - federalPerPeriod - statePerPeriod - ssPerPeriod - medicarePerPeriod - k401Amount - hi

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Gross Pay (per period)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={grossPay} onChange={e => { setGrossPay(e.target.value); save({ grossPay: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Pay Frequency</label>
            <select value={frequency} onChange={e => { setFrequency(e.target.value); save({ frequency: e.target.value }) }} className={inputCls}>
              <option value="weekly">Weekly (52x/year)</option>
              <option value="biweekly">Biweekly (26x/year)</option>
              <option value="semimonthly">Semi-monthly (24x/year)</option>
              <option value="monthly">Monthly (12x/year)</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Filing Status</label>
            <select value={filingStatus} onChange={e => { setFilingStatus(e.target.value); save({ filingStatus: e.target.value }) }} className={inputCls}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>State</label>
            <select value={state} onChange={e => { setState(e.target.value); save({ state: e.target.value }) }} className={inputCls}>
              {Object.entries(STATES).sort(([, a], [, b]) => a.localeCompare(b)).map(([code, name]) => (
                <option key={code} value={code}>{name} {STATE_INCOME_TAX[code] === 0 ? '(no income tax)' : `(${STATE_INCOME_TAX[code]}%)`}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>401k Contribution</label>
              <div className="relative">
                <input type="number" value={k401Pct} onChange={e => { setK401Pct(e.target.value); save({ k401Pct: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="100" step="0.5" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Health Insurance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={healthIns} onChange={e => { setHealthIns(e.target.value); save({ healthIns: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Net Pay</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(netPay)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Annual gross: {fmt(annualGross)}</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2">
            {[
              { label: 'Gross Pay', val: fmt(gp) },
              { label: 'Federal Income Tax', val: `-${fmt(federalPerPeriod)}`, red: true },
              { label: `State Tax (${state}, ${stateRate}%)`, val: `-${fmt(statePerPeriod)}`, red: true },
              { label: 'Social Security (6.2%)', val: `-${fmt(ssPerPeriod)}`, red: true },
              { label: 'Medicare (1.45%)', val: `-${fmt(medicarePerPeriod)}`, red: true },
              { label: `401k (${k401Pct}%)`, val: `-${fmt(k401Amount)}`, muted: true },
              { label: 'Health Insurance', val: `-${fmt(hi)}`, muted: true },
              { label: 'NET PAY', val: fmt(netPay), bold: true },
            ].map(({ label, val, red, muted, bold }) => (
              <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t-2 border-gray-200 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                <span className={`${muted ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>{label}</span>
                <span className={`font-medium ${red ? 'text-red-600 dark:text-red-400' : muted ? 'text-blue-600 dark:text-blue-400' : bold ? 'text-green-700 dark:text-green-400 text-base font-bold' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
              </div>
            ))}
          </div>
          {annualGross > 176100 && (
            <div className="rounded-xl border border-amber-100 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-800 dark:text-amber-300">
              Social Security is only withheld on the first $176,100 of wages (2026 limit).
            </div>
          )}
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        This is an estimate. Actual withholding depends on your W-4 and employer. Consult a tax professional for precise calculations. Results are for educational purposes only.
      </p>
    </div>
  )
}
