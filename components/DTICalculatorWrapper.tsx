'use client'

import dynamic from 'next/dynamic'

const DTICalculator = dynamic(() => import('./DTICalculator'), { ssr: false })

export default function DTICalculatorWrapper() {
  return <DTICalculator />
}
