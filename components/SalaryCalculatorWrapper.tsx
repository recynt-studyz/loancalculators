'use client'

import dynamic from 'next/dynamic'

const SalaryCalculator = dynamic(() => import('./SalaryCalculator'), { ssr: false })

export default function SalaryCalculatorWrapper() {
  return <SalaryCalculator />
}
