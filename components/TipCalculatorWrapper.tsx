'use client'

import dynamic from 'next/dynamic'

const TipCalculator = dynamic(() => import('./TipCalculator'), { ssr: false })

export default function TipCalculatorWrapper() {
  return <TipCalculator />
}
