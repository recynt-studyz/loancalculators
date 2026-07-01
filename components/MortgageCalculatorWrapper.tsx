'use client'

import dynamic from 'next/dynamic'

const MortgageCalculator = dynamic(() => import('./MortgageCalculator'), { ssr: false })

export default function MortgageCalculatorWrapper() {
  return <MortgageCalculator />
}
