'use client'

import dynamic from 'next/dynamic'

const AutoLoanCalculator = dynamic(() => import('./AutoLoanCalculator'), { ssr: false })

export default function AutoLoanCalculatorWrapper() {
  return <AutoLoanCalculator />
}
