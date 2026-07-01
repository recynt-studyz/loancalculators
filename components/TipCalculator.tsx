'use client'

import { useState, useEffect } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

const STORAGE_KEY = 'lc-tip'

export default function TipCalculator() {
  const [bill, setBill] = useState('85.50')
  const [tipPct, setTipPct] = useState(20)
  const [customTip, setCustomTip] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [people, setPeople] = useState('2')
  const [roundUp, setRoundUp] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.bill) setBill(p.bill)
        if (p.tipPct) setTipPct(p.tipPct)
        if (p.people) setPeople(p.people)
        if (p.roundUp !== undefined) setRoundUp(p.roundUp)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const billAmt = parseFloat(bill) || 0
  const effectiveTipPct = isCustom ? (parseFloat(customTip) || 0) : tipPct
  const tipAmount = billAmt * (effectiveTipPct / 100)
  const total = billAmt + tipAmount
  const numPeople = parseInt(people) || 1
  const perPersonRaw = total / numPeople
  const perPerson = roundUp ? Math.ceil(perPersonRaw) : perPersonRaw
  const perPersonTip = tipAmount / numPeople

  const presets = [10, 15, 18, 20, 25]

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Bill Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={bill} onChange={e => { setBill(e.target.value); save({ bill: e.target.value }) }} className={`${inputCls} pl-7`} min="0" step="0.01" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Tip Percentage</label>
            <div className="flex gap-2 flex-wrap">
              {presets.map(p => (
                <button key={p} onClick={() => { setIsCustom(false); setTipPct(p); save({ tipPct: p }) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isCustom && tipPct === p ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                  {p}%
                </button>
              ))}
              <button onClick={() => setIsCustom(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isCustom ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                Custom
              </button>
            </div>
            {isCustom && (
              <div className="relative mt-2">
                <input type="number" value={customTip} onChange={e => setCustomTip(e.target.value)} placeholder="Enter tip %" className={`${inputCls} pr-7`} min="0" max="100" step="0.5" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            )}
          </div>
          <div>
            <label className={labelCls}>Number of People</label>
            <input type="number" value={people} onChange={e => { setPeople(e.target.value); save({ people: e.target.value }) }} className={inputCls} min="1" max="100" />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setRoundUp(!roundUp); save({ roundUp: !roundUp }) }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${roundUp ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${roundUp ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">Round up per person</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-5">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-1">Per Person</p>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{fmt(perPerson)}</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Each person tips {fmt(perPersonTip)}</p>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
            {[
              { label: 'Bill Amount', val: fmt(billAmt) },
              { label: `Tip (${effectiveTipPct}%)`, val: fmt(tipAmount) },
              { label: 'Total Bill', val: fmt(total), bold: true },
            ].map(({ label, val, bold }) => (
              <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2 font-semibold' : ''}`}>
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`${bold ? 'text-gray-900 dark:text-white text-base' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
              </div>
            ))}
          </div>
          {numPeople > 1 && (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-2.5">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Split ({numPeople} people)</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Each person pays</span>
                <span className="font-semibold text-green-700 dark:text-green-400">{fmt(perPerson)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Each person tips</span>
                <span className="text-gray-800 dark:text-[#e2e8f0]">{fmt(perPersonTip)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Results are estimates for educational purposes only. Consult a licensed financial advisor before making financial decisions. Rates and tax figures are approximate.
      </p>
    </div>
  )
}
