'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'lc-dti'

export default function DTICalculator() {
  const [grossIncome, setGrossIncome] = useState('6500')
  const [mortgageRent, setMortgageRent] = useState('1500')
  const [carPayment, setCarPayment] = useState('350')
  const [studentLoans, setStudentLoans] = useState('200')
  const [creditCards, setCreditCards] = useState('100')
  const [otherDebts, setOtherDebts] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.grossIncome) setGrossIncome(p.grossIncome)
        if (p.mortgageRent) setMortgageRent(p.mortgageRent)
        if (p.carPayment) setCarPayment(p.carPayment)
        if (p.studentLoans) setStudentLoans(p.studentLoans)
        if (p.creditCards) setCreditCards(p.creditCards)
        if (p.otherDebts) setOtherDebts(p.otherDebts)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const income = parseFloat(grossIncome) || 0
  const housing = parseFloat(mortgageRent) || 0
  const car = parseFloat(carPayment) || 0
  const student = parseFloat(studentLoans) || 0
  const cc = parseFloat(creditCards) || 0
  const other = parseFloat(otherDebts) || 0
  const totalDebts = housing + car + student + cc + other
  const nonHousingDebts = car + student + cc + other

  const frontEnd = income > 0 ? (housing / income) * 100 : 0
  const backEnd = income > 0 ? (totalDebts / income) * 100 : 0

  function statusInfo(dti: number): { label: string; color: string; icon: string } {
    if (dti < 36) return { label: 'Excellent', color: 'green', icon: '✅' }
    if (dti < 43) return { label: 'Acceptable', color: 'yellow', icon: '⚠️' }
    if (dti < 50) return { label: 'High Risk', color: 'orange', icon: '⚠️' }
    return { label: 'Too High', color: 'red', icon: '❌' }
  }

  const frontStatus = statusInfo(frontEnd)
  const backStatus = statusInfo(backEnd)

  const colorMap: Record<string, string> = {
    green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
    orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300',
    red: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  }

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Monthly Income</p>
            <div>
              <label className={labelCls}>Gross Monthly Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={grossIncome} onChange={e => { setGrossIncome(e.target.value); save({ grossIncome: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Monthly Debt Payments</p>
            <div className="space-y-3">
              {[
                { label: 'Mortgage / Rent', val: mortgageRent, set: setMortgageRent, key: 'mortgageRent' },
                { label: 'Car Payment', val: carPayment, set: setCarPayment, key: 'carPayment' },
                { label: 'Student Loans', val: studentLoans, set: setStudentLoans, key: 'studentLoans' },
                { label: 'Credit Cards (min payment)', val: creditCards, set: setCreditCards, key: 'creditCards' },
                { label: 'Other Debts', val: otherDebts, set: setOtherDebts, key: 'otherDebts' },
              ].map(({ label, val, set, key }) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input type="number" value={val} onChange={e => { set(e.target.value); save({ [key]: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-xl border p-4 ${colorMap[frontStatus.color]}`}>
              <p className="text-xs font-medium opacity-70 mb-1">Front-end DTI</p>
              <p className="text-3xl font-bold">{frontEnd.toFixed(1)}%</p>
              <p className="text-sm font-medium mt-1">{frontStatus.icon} {frontStatus.label}</p>
              <p className="text-xs opacity-70 mt-1">Housing only</p>
            </div>
            <div className={`rounded-xl border p-4 ${colorMap[backStatus.color]}`}>
              <p className="text-xs font-medium opacity-70 mb-1">Back-end DTI</p>
              <p className="text-3xl font-bold">{backEnd.toFixed(1)}%</p>
              <p className="text-sm font-medium mt-1">{backStatus.icon} {backStatus.label}</p>
              <p className="text-xs opacity-70 mt-1">All debts</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Debt Breakdown</p>
            {[
              { label: 'Total Monthly Debts', val: `$${totalDebts.toFixed(0)}` },
              { label: 'Gross Monthly Income', val: `$${income.toFixed(0)}` },
              { label: 'Housing + Other Debts', val: `$${housing.toFixed(0)} + $${nonHousingDebts.toFixed(0)}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">What Lenders Want</p>
            <div className="space-y-2">
              {[
                { range: 'Under 36%', label: 'Excellent', icon: '✅' },
                { range: '36% – 43%', label: 'Acceptable', icon: '⚠️' },
                { range: '43% – 50%', label: 'High Risk', icon: '⚠️' },
                { range: 'Over 50%', label: 'Too High', icon: '❌' },
              ].map(({ range, label, icon }) => (
                <div key={range} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{range}</span>
                  <span className="text-gray-700 dark:text-gray-300">{icon} {label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
