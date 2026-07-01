import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CreditCardCalculatorWrapper from '@/components/CreditCardCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator — Debt Payoff Planner',
  description: 'Calculate how long to pay off credit card debt and total interest paid. Free credit card payoff calculator with month-by-month payment schedule.',
  alternates: { canonical: 'https://loancalculators.app/credit-card' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How long will it take to pay off my credit card?', a: 'The time to pay off a credit card depends on your balance, APR, and monthly payment. Use the formula: months = -log(1 - balance × monthly rate / payment) / log(1 + monthly rate). Our credit card payoff calculator does this instantly. Making only minimum payments on a $5,000 balance at 22% APR can take over 10 years.' },
  { q: 'How much does credit card interest cost?', a: 'Credit card interest is expensive. A $5,000 balance at 22.99% APR with a $150/month payment costs approximately $2,000–$2,500 in interest over the payoff period. The exact amount depends on your payment size. Our calculator shows your total interest paid for any payment amount.' },
  { q: 'What is the best strategy to pay off credit card debt?', a: 'Two popular strategies: (1) Debt Avalanche — pay minimums on all cards, put extra money toward the highest APR card first. This saves the most in total interest. (2) Debt Snowball — pay minimums on all cards, attack the lowest balance first. This provides quick wins and psychological motivation. The avalanche saves more money; the snowball may be more sustainable.' },
  { q: 'What is a minimum payment on a credit card?', a: 'Credit card minimum payments are typically 1–3% of the outstanding balance or a flat minimum (often $25–35), whichever is greater. Making only minimum payments means most of your payment goes to interest rather than principal, resulting in very slow payoff and enormous total interest charges over time.' },
  { q: 'How does credit card APR work?', a: 'Credit card APR (Annual Percentage Rate) is the yearly interest rate applied to your outstanding balance. It is divided by 12 to get the monthly rate. If you carry a $1,000 balance at 22.99% APR, you pay $1,000 × (22.99/100/12) ≈ $19.16 in interest that month. Unlike loans, credit card interest compounds monthly on whatever balance you carry.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Credit Card Payoff Calculator',
  url: 'https://loancalculators.app/credit-card', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Credit Card Payoff Time',
  step: [
    { '@type': 'HowToStep', name: 'Enter your balance and APR', text: 'Enter your current credit card balance and the annual interest rate (APR) from your statement.' },
    { '@type': 'HowToStep', name: 'Enter your monthly payment or target payoff time', text: 'Either enter how much you can pay each month, or switch to "pay off in X months" mode to find the required payment.' },
    { '@type': 'HowToStep', name: 'See your payoff date and total interest', text: 'View months to payoff, total interest paid, payoff date, and how paying $50 more per month would save you time and money.' },
  ],
}

export default function CreditCardPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Credit Card Payoff Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              See exactly how long to pay off your credit card debt and how much interest it will cost. Find out how extra payments can save you thousands.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111119" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <CreditCardCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222230" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Stop guessing — know your exact payoff date</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Credit card debt is expensive because of high APRs (often 20–30%) that compound monthly. This credit card payoff calculator shows your exact payoff timeline and total interest cost. Use it to see how increasing your monthly payment by even $50–$100 can cut months or years off your payoff date and save hundreds in interest. The month-by-month schedule shows exactly how your balance decreases over time.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333341" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
