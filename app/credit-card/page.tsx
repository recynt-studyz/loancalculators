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
  { q: 'How long will it take to pay off my credit card?', a: 'The payoff timeline depends on your balance, APR, and monthly payment. The formula is: months = &minus;ln(1 &minus; balance &times; monthly rate / payment) / ln(1 + monthly rate). A $4,500 balance at 22.99% APR with a $150/month payment takes about 45 months (nearly 4 years) and costs roughly $2,250 in interest. Making only the minimum payment can extend this to 10+ years. Our credit card payoff calculator shows your exact timeline instantly for any combination of balance, APR, and payment amount.' },
  { q: 'How much does credit card interest cost?', a: 'Credit card interest is some of the most expensive debt available to consumers. A $4,500 balance at 22.99% APR with a $150/month payment costs approximately $2,250 in total interest — meaning you pay back nearly $6,750 for $4,500 borrowed. At higher balances or APRs, the total interest can easily exceed the original balance. The key insight from the payoff calculator is how dramatically increasing your monthly payment reduces total interest: adding just $75/month to that example cuts the total interest by over $800 and trims 18 months off the payoff timeline.' },
  { q: 'What is the best strategy to pay off credit card debt?', a: 'Two popular strategies exist for paying off multiple credit cards: (1) Debt Avalanche — pay minimums on all cards, then put all extra money toward the highest-APR card first. This is mathematically optimal and saves the most in total interest. (2) Debt Snowball — pay minimums on all cards, then attack the lowest balance first regardless of rate. This provides quick psychological wins by eliminating cards faster and can help you stay motivated. Research suggests that for people who struggle with consistency, the Snowball method leads to better real-world outcomes despite costing slightly more in interest. Neither is wrong — choose the one you will actually stick to.' },
  { q: 'What is a minimum payment on a credit card?', a: 'Credit card minimum payments are typically 1–3% of the outstanding balance or a flat dollar minimum (often $25–35), whichever is greater. Some issuers calculate minimums as 1% of the balance plus any accrued interest and fees. Making only minimum payments is financially very costly: on a $4,500 balance at 22.99% APR, paying only the minimums could take over 15 years and cost more than $5,000 in interest — more than the original balance. Credit card statements are now required by law to disclose how long it will take to pay off the balance making only minimum payments.' },
  { q: 'How does credit card APR work?', a: 'Credit card APR (Annual Percentage Rate) is divided by 12 to get the monthly periodic rate applied to your average daily balance. A 22.99% APR means a monthly rate of 22.99 / 12 = 1.916%. If you carry a $1,000 balance for a full month, you owe $1,000 &times; 0.01916 = $19.16 in interest. Unlike loans, credit cards have revolving balances — you can pay any amount between the minimum and the full balance. If you pay the full balance by the due date each month, you typically owe no interest at all due to the grace period. Interest only accrues when you carry a balance from one billing cycle to the next.' },
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
              Credit card debt is expensive because of high APRs (often 20–30%) that compound monthly. This credit card payoff calculator shows your exact payoff timeline and total interest cost. Use it to see how increasing your monthly payment by even $50–$100 can cut months or years off your payoff date and save hundreds in interest. The month-by-month schedule shows exactly how your balance decreases over time. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Credit Card Payoff Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Unlike installment loans with a fixed term, credit cards are revolving debt — you can carry any balance and pay any amount above the minimum. The payoff calculator works by simulating the month-by-month balance reduction until the debt reaches zero:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Monthly Interest = Balance &times; (APR / 12)<br />
              New Balance = Balance + Monthly Interest &minus; Payment<br />
              Repeat until Balance &le; 0
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For &ldquo;solve for months&rdquo; mode, the calculator uses the logarithmic formula: n = &minus;ln(1 &minus; r &times; B / P) / ln(1 + r), where r is the monthly rate, B is the balance, and P is the payment. For &ldquo;solve for required payment&rdquo; mode, it finds the PMT that zeros the balance in exactly your target number of months using the standard annuity formula. Both modes produce the same detailed month-by-month schedule so you can see every dollar of interest charged.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Ryan has a $4,500 credit card balance at 22.99% APR. He can comfortably pay $150/month. How long will it take to pay off, and what would paying $225/month instead look like?
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>At $150/month:</strong> Monthly rate = 22.99% / 12 = 1.916%. Using the payoff formula: n = &minus;ln(1 &minus; 0.01916 &times; 4,500 / 150) / ln(1.01916) = approximately <strong>45 months</strong> (3 years 9 months). Total paid: $150 &times; 45 = $6,750. Total interest: <strong>$2,250</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>At $225/month:</strong> The payoff time drops to approximately <strong>25 months</strong> (2 years 1 month). Total paid: $225 &times; 25 = $5,625. Total interest: <strong>$1,125</strong>. By paying $75 more per month, Ryan saves $1,125 in interest and pays off his debt 20 months earlier. That extra $75/month costs him $1,875 in total additional payments but saves $1,125 in interest — a net benefit of saving 20 months of debt stress.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Payoff Timeline</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">APR (Interest Rate):</strong> Credit card APRs are significantly higher than other consumer debt — typically 18–30%. Even a few percentage points make a large difference in payoff time. If possible, transferring your balance to a card with a 0% promotional APR can dramatically accelerate payoff since every dollar of your payment goes directly to principal.</li>
              <li><strong className="text-gray-900 dark:text-white">Monthly Payment Amount:</strong> This is the single most controllable variable. Even small increases have an outsized impact because they reduce the principal faster, which reduces the interest charged the following month. The snowball effect works in your favor here — each dollar extra you pay now saves more than a dollar later.</li>
              <li><strong className="text-gray-900 dark:text-white">Current Balance:</strong> A higher starting balance means more interest accrues every month, which requires a larger payment just to stay ahead. Understanding your starting balance and minimum payment vs. actual payoff payment is essential for making a realistic debt payoff plan.</li>
              <li><strong className="text-gray-900 dark:text-white">New Charges:</strong> The calculator assumes you stop adding new charges during the payoff period. Continuing to charge on the card while paying it down is one of the most common reasons people never escape credit card debt — interest on new charges compounds alongside the existing balance.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333341" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
