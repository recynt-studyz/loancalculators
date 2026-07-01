'use client'

import dynamic from 'next/dynamic'

const CompoundInterestCalculator = dynamic(() => import('./CompoundInterestCalculator'), { ssr: false })

export default function CompoundInterestCalculatorWrapper() {
  return <CompoundInterestCalculator />
}
