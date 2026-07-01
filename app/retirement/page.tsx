import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RetirementCalculatorWrapper from '@/components/RetirementCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Retirement Calculator — 401k & Savings Planner',
  description: 'Calculate your retirement savings growth including 401k contributions and employer match. Free retirement calculator with year-by-year projections.',
  alternates: { canonical: 'https://loancalculators.app/retirement' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much should I have saved for retirement by age?', a: 'Fidelity recommends these savings benchmarks: 1× your salary by 30, 3× by 40, 6× by 50, 8× by 60, 10× by 67. For a $75,000 salary, that means $75K by 30, $225K by 40, $450K by 50, $600K by 60, and $750K by retirement. These are targets, not absolutes — use this retirement calculator to model your specific situation.' },
  { q: 'What is the 4% retirement rule?', a: 'The 4% rule suggests you can withdraw 4% of your retirement portfolio in year one, then adjust for inflation each year, and have a very high probability your money lasts 30 years. A $1,000,000 portfolio supports $40,000/year in withdrawals. Some financial advisors now recommend 3–3.5% for longer retirement horizons.' },
  { q: 'How much should I contribute to my 401k?', a: 'At minimum, contribute enough to capture your full employer match — otherwise you are leaving free money on the table. Beyond that, aim to contribute 15% of your income (including employer match) toward retirement. The 2026 401k contribution limit is $23,500 (plus $7,500 catch-up if you are 50 or older).' },
  { q: 'What is employer match and how does it work?', a: 'Employer match is free retirement money your employer adds to your 401k when you contribute. A common match is "50% up to 6% of salary" — if you earn $75,000 and contribute 6% ($4,500/year), your employer adds $2,250. Always contribute at least enough to get the full match. It is an immediate 50–100% return on that portion.' },
  { q: 'When can I retire comfortably?', a: 'Retirement readiness depends on your savings, expected expenses, Social Security benefits, and investment returns. A common benchmark is having 25× your annual expenses saved (based on the 4% rule). If you spend $60,000/year, you need about $1.5 million. Use this retirement calculator to project your balance and see when you might hit your target.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Retirement Calculator',
  url: 'https://loancalculators.app/retirement', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Retirement Savings',
  step: [
    { '@type': 'HowToStep', name: 'Enter your age and current savings', text: 'Enter your current age, planned retirement age, and current retirement savings balance.' },
    { '@type': 'HowToStep', name: 'Set contributions, employer match, and expected return', text: 'Enter your monthly contribution, employer match percentage, salary, and expected annual investment return.' },
    { '@type': 'HowToStep', name: 'View projected balance and retirement income', text: 'See your projected balance at retirement, inflation-adjusted value, estimated monthly income using the 4% rule, and year-by-year growth.' },
  ],
}

export default function RetirementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobglc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Retirement Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Project your 401k and retirement savings growth with employer match, investment returns, and inflation adjustment. Year-by-year projections included.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111120" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RetirementCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222231" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Plan your retirement with confidence</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This retirement calculator projects your 401k and savings growth over time, accounting for employer match, expected investment returns, and inflation. The results show your projected nominal balance at retirement and its inflation-adjusted purchasing power in today&apos;s dollars. The 4% rule estimate shows how much monthly income your savings could support. Starting early has a dramatic impact — 10 more years of compounding can more than double your ending balance. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333342" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
