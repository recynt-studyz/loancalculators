import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RefinanceCalculatorWrapper from '@/components/RefinanceCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Refinance Calculator — Should You Refinance?',
  description: 'Calculate refinance savings, break-even point and whether refinancing makes sense for your situation. Free mortgage refinance calculator with closing costs.',
  alternates: { canonical: 'https://loancalculators.app/refinance' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'When should I refinance my mortgage?', a: 'Refinancing generally makes sense when you can lower your interest rate by at least 0.5–1%, you plan to stay in the home long enough to recoup closing costs (the break-even point), and your credit score and home equity have improved since your original loan. Our refinance calculator shows your exact break-even point based on your numbers.' },
  { q: 'What is a break-even point for refinancing?', a: 'The refinance break-even point is when your cumulative monthly savings equal your closing costs. For example, if refinancing saves $327/month and closing costs are $6,000, you break even in about 18 months ($6,000 ÷ $327). If you plan to stay longer than 18 months, refinancing saves you money. If you might move sooner, it may not be worth it.' },
  { q: 'How much does refinancing cost?', a: 'Refinancing typically costs 2–5% of the loan amount in closing costs, including origination fees, appraisal, title search, title insurance, and recording fees. On a $300,000 loan, expect $6,000–$15,000 in closing costs. Some lenders offer "no-closing-cost" refinances with a slightly higher rate instead.' },
  { q: 'How much can refinancing save me?', a: 'Savings from refinancing depend on how much you lower your rate and how long you keep the loan. Dropping from 7.5% to 6.5% on a $280,000 30-year mortgage saves about $160–$180/month in interest. Over 30 years, that is $50,000+ in savings, though most people refinance or sell before then.' },
  { q: 'Does refinancing hurt my credit score?', a: 'Refinancing causes a small, temporary credit score dip (typically 5–10 points) from the hard credit inquiry. Your score usually recovers within a few months. If you are rate shopping, multiple mortgage inquiries within a 14–45 day window are treated as a single inquiry by FICO, so shopping multiple lenders does not significantly amplify the impact.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Refinance Calculator',
  url: 'https://loancalculators.app/refinance', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Refinance Savings',
  step: [
    { '@type': 'HowToStep', name: 'Enter your current loan details', text: 'Enter your current loan balance, interest rate, and monthly payment.' },
    { '@type': 'HowToStep', name: 'Enter the new loan terms and closing costs', text: 'Enter your new interest rate, new loan term, and estimated closing costs.' },
    { '@type': 'HowToStep', name: 'See break-even point and recommendation', text: 'View your monthly savings, break-even timeline, and a personalized recommendation based on how long you plan to stay.' },
  ],
}

export default function RefinancePage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Refinance Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Find out if refinancing makes sense for you. Calculate monthly savings, break-even point, and get a clear recommendation based on your situation.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111122" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RefinanceCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222233" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Is now the right time to refinance?</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This refinance calculator compares your current mortgage to a new loan and gives you a clear answer on whether refinancing makes financial sense. The break-even analysis tells you exactly how many months it takes to recover closing costs through monthly savings. Tell the calculator how long you plan to stay in your home, and it gives you a direct ✅ or ❌ recommendation based on your numbers. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333344" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
