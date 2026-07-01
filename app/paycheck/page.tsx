import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PaycheckCalculatorWrapper from '@/components/PaycheckCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Take-Home Pay After Taxes',
  description: 'Calculate your take-home pay after federal taxes, state taxes, Social Security and Medicare. Free paycheck calculator for all 50 states.',
  alternates: { canonical: 'https://loancalculators.app/paycheck' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much tax is taken out of my paycheck?', a: 'Federal income tax withholding depends on your income, filing status, and W-4 elections. A single filer earning $5,000 biweekly ($130,000/year) might have 22–24% federal tax withheld. Add 6.2% Social Security, 1.45% Medicare, plus state income tax. Total federal + FICA taxes are typically 20–35% of gross pay for most workers.' },
  { q: 'What is FICA tax?', a: 'FICA (Federal Insurance Contributions Act) is the combined Social Security and Medicare tax withheld from every paycheck. Employees pay 6.2% for Social Security (on wages up to $176,100 in 2026) and 1.45% for Medicare (on all wages). Your employer matches these amounts. Self-employed individuals pay both halves (15.3% total) as self-employment tax.' },
  { q: 'How do I increase my take-home pay?', a: 'Increase take-home pay by: (1) Contributing to a pre-tax 401k or HSA, which reduces taxable income; (2) Updating your W-4 to reflect your actual situation (married, dependents, etc.); (3) Contributing to a Dependent Care FSA if you have childcare expenses; (4) Checking if you qualify for tax credits. Consult a tax professional to optimize your withholding.' },
  { q: 'What is the difference between gross and net pay?', a: 'Gross pay is your total earnings before any deductions — the salary or hourly rate you agreed to. Net pay (take-home pay) is what you actually receive after federal income tax, state income tax, Social Security, Medicare, 401k contributions, health insurance premiums, and any other deductions are withheld. Net pay is typically 65–80% of gross pay.' },
  { q: 'How does my 401k contribution affect my paycheck?', a: 'Traditional 401k contributions reduce your taxable income dollar-for-dollar. A 6% contribution on a $5,000 paycheck = $300 taken from gross. However, it reduces your taxable income, so your federal tax withholding decreases. The net effect on take-home pay is less than $300 — often $210–$240 depending on your tax bracket — making 401k contributions very efficient.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Paycheck Calculator',
  url: 'https://loancalculators.app/paycheck', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Take-Home Pay',
  step: [
    { '@type': 'HowToStep', name: 'Enter your gross pay and frequency', text: 'Enter your gross pay per period and select how often you are paid (weekly, biweekly, semi-monthly, or monthly).' },
    { '@type': 'HowToStep', name: 'Enter filing status, state, and deductions', text: 'Select your federal filing status, your state, and enter any 401k contributions or health insurance premiums.' },
    { '@type': 'HowToStep', name: 'See your detailed net pay breakdown', text: 'View a line-by-line breakdown of all deductions including federal tax, state tax, Social Security, Medicare, and pre-tax benefits to see your exact take-home pay.' },
  ],
}

export default function PaycheckPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Paycheck Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your take-home pay after federal taxes, state taxes, FICA, and deductions. All 50 states supported with 2026 tax rates.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111125" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <PaycheckCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222236" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">See exactly what comes out of your paycheck</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This paycheck calculator uses 2026 federal income tax brackets and state income tax rates to estimate your take-home pay. Pre-tax deductions like 401k contributions and health insurance premiums are subtracted before calculating federal and state taxes, showing their true tax savings. State income tax rates are approximate — your actual withholding may vary based on your W-4 elections and employer policies. Always verify with your actual pay stub. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333347" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
