'use client'

import dynamic from 'next/dynamic'

const LoanCalculator = dynamic(() => import('./LoanCalculator'), { ssr: false })

export default function LoanCalculatorWrapper() {
  return <LoanCalculator />
}
