import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import AutoLoanCalculatorWrapper from '@/components/AutoLoanCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Auto Loan Calculator — Car Payment Calculator',
  description: 'Calculate your monthly car payment, total cost and interest for any auto loan. Free car payment calculator with trade-in value and sales tax. Instant results.',
  alternates: { canonical: 'https://loancalculators.app/auto-loan' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'What is a good interest rate for a car loan?', a: 'As of 2026, average new car loan rates run around 7%–9% for buyers with good credit (700+ score). Used car loans typically carry rates 1–2 percentage points higher due to greater collateral risk. Credit unions consistently offer rates 1–2% lower than banks or dealership financing arms, so it is worth getting a credit union pre-approval before visiting a dealer. A rate below 6% for a new car is generally excellent; anything above 12% is costly and worth avoiding if possible by improving your credit score first.' },
  { q: 'How does a trade-in affect my auto loan?', a: 'A trade-in reduces the amount you need to finance, which lowers your monthly payment and total interest paid. If your car is worth $8,000 as a trade-in, that value is applied against the purchase price before the loan is calculated. Many states also reduce the taxable amount of the new vehicle purchase by the trade-in value, saving additional sales tax. Our auto loan calculator lets you enter your trade-in value separately so you can see its exact impact on your monthly payment and total cost. If you owe more on your current car than it is worth (negative equity), that amount is typically rolled into the new loan.' },
  { q: 'Should I put more money down on a car?', a: 'A larger down payment reduces the amount financed, lowers your monthly payment, reduces total interest paid, and helps avoid being "underwater" on the loan — owing more than the car is worth. New cars can lose 20–30% of their value in the first year, so a small down payment can quickly put you in a negative equity position. Most financial advisors recommend at least 10–20% down on a new car and 10% on a used car. A down payment also signals to the lender that you have skin in the game, which can sometimes improve your interest rate offer.' },
  { q: 'What is a good monthly car payment?', a: 'Financial advisors commonly recommend keeping total vehicle costs — payment, insurance, fuel, and maintenance — under 15–20% of your monthly take-home pay. For someone bringing home $4,000/month, that is $600–$800 for all vehicle-related expenses combined, not just the loan payment. A car payment of $300–$500/month is typical for mid-range vehicles. The best approach is to decide what total monthly payment fits your budget and then use our calculator to work backward to a vehicle price — rather than falling in love with a car and then figuring out if you can afford it.' },
  { q: 'How long should my auto loan term be?', a: 'Shorter loan terms (36–48 months) cost less in total interest and reduce the risk of being underwater on a depreciating asset, but carry higher monthly payments. Longer terms (60–84 months) lower your payment but you pay significantly more in interest and keep the debt longer than many cars remain reliable. A 72-month loan on a new car means you may still be paying when the car needs major repairs. Most financial experts recommend keeping auto loans to 60 months or less. If the only way to afford a car is a 72- or 84-month loan, the vehicle price may be outside your budget.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Auto Loan Calculator',
  url: 'https://loancalculators.app/auto-loan', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Car Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter vehicle price, down payment, and trade-in', text: 'Enter the vehicle price, your down payment, any trade-in value, and your state sales tax rate.' },
    { '@type': 'HowToStep', name: 'Enter your interest rate and loan term', text: 'Enter the APR from your lender and choose your loan term in months (24–84 months).' },
    { '@type': 'HowToStep', name: 'See your monthly car payment and total cost', text: 'View your monthly payment, total interest, and how your rate compares to the national average.' },
  ],
}

export default function AutoLoanPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Auto Loan Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your monthly car payment with trade-in value, sales tax, and true loan cost. Instant results.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111113" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <AutoLoanCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222224" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Calculate your true car payment</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This auto loan calculator includes all the factors that affect your real car payment: vehicle price, down payment, trade-in value, state sales tax, interest rate, and loan term. Many buyers forget that sales tax is added to the financed amount, increasing the loan balance. Enter your state&apos;s sales tax rate or the exact rate from your dealer to see your true monthly car payment. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Auto Loan Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              An auto loan works exactly like a personal loan: the PMT formula calculates a fixed monthly payment that pays off principal plus interest over the chosen term. The key difference in auto loan math is that the financed amount is not just the vehicle price — sales tax, dealer fees, and any negative trade-in equity are often rolled into the loan.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Loan Amount = (Vehicle Price + Sales Tax) &minus; Down Payment &minus; Trade-In Value<br />
              Monthly Payment = Loan Amount &times; r / (1 &minus; (1+r)^&minus;n)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Sales tax is calculated on the vehicle price (or the price minus trade-in in states that offer that benefit) and is typically financed alongside the purchase price. This means even a 7% sales tax on a $35,000 car adds $2,450 to the loan — an amount that also accrues interest over the life of the loan. Our calculator applies sales tax correctly so your payment estimate reflects what you&apos;ll actually owe at the dealership.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Jordan is buying a $32,000 used SUV in Texas (6.25% sales tax). He has a $3,000 down payment and is trading in his old car for $4,500. His credit union pre-approved him at 7.4% APR for 60 months.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Sales tax on $32,000 = $2,000. Loan amount = $32,000 + $2,000 &minus; $3,000 &minus; $4,500 = <strong>$26,500</strong>. With r = 7.4% / 12 = 0.617% per month and n = 60, the monthly payment is approximately <strong>$527/month</strong>. Over 60 months Jordan pays $31,620 total — the $26,500 principal plus about <strong>$5,120 in interest</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If Jordan extended to 72 months, the payment drops to about $455/month — saving $72/month — but total interest rises to about $6,260, costing him an extra $1,140 over the life of the loan. Alternatively, adding $1,000 more to his down payment ($4,000 total) would cut his payment to roughly $507/month and save about $400 in interest. Small changes in down payment and term can meaningfully affect total cost.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Car Payment</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Vehicle Price:</strong> The sticker price is your starting point, but the amount financed is what determines your payment. Negotiating the sale price is always more impactful than negotiating the interest rate alone — every $1,000 off the price saves roughly $20/month on a 60-month loan.</li>
              <li><strong className="text-gray-900 dark:text-white">Interest Rate (APR):</strong> Auto loan rates vary significantly by lender, credit score, and whether the vehicle is new or used. Getting pre-approved at a credit union before visiting a dealer gives you negotiating leverage and protects you from inflated dealer financing rates.</li>
              <li><strong className="text-gray-900 dark:text-white">Loan Term:</strong> Longer terms lower your payment but increase total interest and the risk of negative equity as the car depreciates. Keeping the term to 60 months or less is generally wise for most buyers.</li>
              <li><strong className="text-gray-900 dark:text-white">Sales Tax and Fees:</strong> State sales tax, dealer documentation fees, and registration costs can add $2,000–$4,000 to a typical vehicle purchase. These are often financed alongside the purchase price, so they should always be factored into your affordability calculation.</li>
              <li><strong className="text-gray-900 dark:text-white">Trade-In Value:</strong> A strong trade-in reduces the loan amount significantly. Get independent appraisals from Carmax, Carvana, or a competing dealer to ensure you know your car&apos;s market value before negotiating with a dealer.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333335" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
