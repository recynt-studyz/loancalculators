'use client'

import dynamic from 'next/dynamic'

const RetirementCalculator = dynamic(() => import('./RetirementCalculator'), { ssr: false })

export default function RetirementCalculatorWrapper() {
  return <RetirementCalculator />
}
