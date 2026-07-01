'use client'

import dynamic from 'next/dynamic'

const AffordabilityCalculator = dynamic(() => import('./AffordabilityCalculator'), { ssr: false })

export default function AffordabilityCalculatorWrapper() {
  return <AffordabilityCalculator />
}
