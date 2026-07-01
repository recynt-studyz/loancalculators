'use client'

import dynamic from 'next/dynamic'

const RefinanceCalculator = dynamic(() => import('./RefinanceCalculator'), { ssr: false })

export default function RefinanceCalculatorWrapper() {
  return <RefinanceCalculator />
}
