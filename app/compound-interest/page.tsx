import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CompoundInterestCalculatorWrapper from '@/components/CompoundInterestCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Investment Growth',
  description: 'Calculate compound interest and investment growth over time. See how your money grows with regular contributions. Free compound interest calculator.',
  alternates: { canonical: 'https://loancalculators.app/compound-interest' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which only earns on the principal), compound interest grows exponentially — your interest earns interest. This "compounding effect" is why long-term investments grow so dramatically over time.' },
  { q: 'How often does compound interest compound?', a: 'Compound interest can compound daily, monthly, quarterly, or annually. The more frequently it compounds, the more interest you earn. Daily compounding earns slightly more than monthly or annually at the same stated rate. Our compound interest calculator lets you compare all compounding frequencies.' },
  { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick mental math shortcut: divide 72 by your annual interest rate to estimate how many years it takes to double your money. For example, at 7% annual return, your money doubles in roughly 72 ÷ 7 ≈ 10.3 years. It works best for rates between 6% and 10%.' },
  { q: 'How does compound interest differ from simple interest?', a: 'Simple interest is calculated only on the original principal: Interest = Principal × Rate × Time. Compound interest also earns interest on previously accumulated interest. Over long periods, the difference is enormous. $10,000 at 7% simple interest for 30 years = $31,000. At 7% compound interest = $76,122.' },
  { q: 'What is a good annual return to expect?', a: 'Historically, the U.S. stock market (S&P 500) has returned about 10% annually before inflation, or about 7% after inflation. High-yield savings accounts offer 4–5%. CDs offer 4–5%. Bonds average 2–4%. The "right" return depends on your risk tolerance and investment horizon. This calculator defaults to 7% as a conservative long-term estimate.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Compound Interest Calculator',
  url: 'https://loancalculators.app/compound-interest', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Compound Interest',
  step: [
    { '@type': 'HowToStep', name: 'Enter your initial investment and monthly contribution', text: 'Enter the amount you are starting with and how much you plan to add each month.' },
    { '@type': 'HowToStep', name: 'Set interest rate and compounding frequency', text: 'Enter your expected annual return and how often it compounds (daily, monthly, quarterly, or annually).' },
    { '@type': 'HowToStep', name: 'View your investment growth year by year', text: 'See your future value, total contributions, total interest earned, and a year-by-year breakdown with visual chart.' },
  ],
}

export default function CompoundInterestPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Compound Interest Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              See how compound interest grows your investments over time. Enter your initial investment, monthly contributions, and expected return for year-by-year projections.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111115" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <CompoundInterestCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222226" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">The power of compound interest over time</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Albert Einstein reportedly called compound interest the &quot;eighth wonder of the world.&quot; A $10,000 investment with $200/month at 7% annual return grows to over $138,000 in 20 years — even though total contributions are only $58,000. The remaining $80,000+ is pure compound interest. Starting early makes an enormous difference: money invested in your 20s has decades to compound, while money invested in your 40s has half the time. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333337" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
