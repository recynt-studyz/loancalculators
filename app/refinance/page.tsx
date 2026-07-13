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
  { q: 'When should I refinance my mortgage?', a: 'Refinancing generally makes financial sense when you can lower your interest rate by at least 0.5%–1%, you plan to stay in the home long enough to recoup closing costs (your break-even point), and your credit score and equity position have improved since your original loan. The "1% rule" is a common guideline, but the right threshold depends on your specific loan size — on a large balance, even a 0.25% rate drop can save significant money. Our refinance calculator shows your exact break-even point, so you can compare it against how long you plan to keep the loan.' },
  { q: 'What is a break-even point for refinancing?', a: 'The refinance break-even point is the number of months it takes for your cumulative monthly savings to equal your total closing costs. For example, if refinancing saves $300/month and closing costs are $6,000, your break-even is $6,000 / $300 = 20 months. If you plan to stay in the home longer than 20 months, refinancing saves you money; if you might sell or move before then, you would lose money on the deal. The break-even analysis is the most important output of a refinance evaluation — our calculator shows it clearly so you can make an informed decision.' },
  { q: 'How much does refinancing cost?', a: 'Refinancing typically costs 2–5% of the loan amount in closing costs, which include origination fees, appraisal fees ($400–$700), title search and insurance, recording fees, and prepaid interest. On a $300,000 loan, expect $6,000–$15,000 in closing costs. Some lenders offer "no-closing-cost" refinances where closing costs are either rolled into the loan balance (increasing your principal) or offset by a higher interest rate. No-closing-cost options make sense if you plan to move or refinance again within a few years, since you avoid the upfront cost but accept a slightly worse rate.' },
  { q: 'How much can refinancing save me?', a: 'Savings from refinancing depend on the rate reduction and how long you keep the loan. Dropping from 7.5% to 6.5% on a $280,000 30-year mortgage saves about $180/month in P&I. Over 10 years (a realistic holding period), that is $21,600 in savings. Over the full 30 years, savings approach $65,000. However, if you extend your loan term (e.g., refinancing a 25-year remaining loan into a new 30-year loan), your monthly payment drops but you pay interest for 5 more years — which can actually increase total interest paid. Always compare total cost across the remaining life of both loans, not just monthly payment.' },
  { q: 'Does refinancing hurt my credit score?', a: 'Refinancing causes a small, temporary credit score decrease — typically 5–15 points — from the hard inquiry the lender makes when you apply. Your score usually recovers within 3–6 months, especially if you continue making on-time payments. If you are rate shopping among multiple lenders, try to complete all applications within a 14–45 day window, which credit scoring models treat as a single inquiry. The impact of a 5–10 point temporary drop is almost always worth a better mortgage rate that saves thousands over the life of the loan, so credit concerns should rarely stop you from refinancing when the numbers make sense.' },
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
              This refinance calculator compares your current mortgage to a new loan and gives you a clear answer on whether refinancing makes financial sense. The break-even analysis tells you exactly how many months it takes to recover closing costs through monthly savings. Tell the calculator how long you plan to stay in your home, and it gives you a direct recommendation based on your numbers. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Refinance Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A refinance comparison involves two calculations: the monthly payment on your current loan versus the monthly payment on the proposed new loan, then dividing the closing costs by the monthly savings to find the break-even point.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              New Payment = Loan Balance &times; r_new / (1 &minus; (1+r_new)^&minus;n_new)<br />
              Monthly Savings = Current Payment &minus; New Payment<br />
              Break-Even Months = Closing Costs &divide; Monthly Savings
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The calculator also tracks total interest paid under both scenarios over your planned stay in the home, so you can compare apples to apples. This is important because extending your loan term (refinancing a 20-year remaining loan into a new 30-year) lowers monthly payments but may increase total interest paid — a tradeoff that is only visible when you look at cumulative cost rather than monthly savings alone.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Linda bought her home 5 years ago with a $320,000 mortgage at 7.75%. Her remaining balance is approximately $295,000 with 25 years left. Her current P&amp;I payment is about $2,265/month. She is quoted a refinance to a new 30-year loan at 6.5% with $6,500 in closing costs.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              New payment at 6.5% on $295,000 for 30 years: approximately <strong>$1,865/month</strong>. Monthly savings: $2,265 &minus; $1,865 = <strong>$400/month</strong>. Break-even: $6,500 / $400 = <strong>16.25 months</strong> — about 16 months. If Linda plans to stay in the home more than 16 months (very likely), refinancing saves her money.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Over 5 years (her rough planning horizon before a potential move), she saves $400 &times; 60 months = $24,000 in lower payments, minus $6,500 in closing costs = <strong>net savings of $17,500</strong>. Note: her new loan resets to 30 years, so she is trading a 25-year remaining term for 30 years — this extends her total debt timeline. If staying long-term matters, she should compare refinancing into a 20 or 25-year loan instead to preserve her payoff date.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in a Refinance Decision</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Rate Reduction:</strong> The larger the rate drop, the bigger the monthly savings and the shorter the break-even period. A 1% rate reduction on a $295,000 loan saves roughly $180–$200/month depending on the term. A 0.5% reduction saves about $90–$100/month and may still be worth it if you plan to stay long-term.</li>
              <li><strong className="text-gray-900 dark:text-white">Closing Costs:</strong> Higher closing costs push the break-even point further out, making refinancing riskier if you might move or refinance again soon. Shop at least 3 lenders for refinance quotes, as closing costs vary significantly and are negotiable.</li>
              <li><strong className="text-gray-900 dark:text-white">New Loan Term:</strong> Extending your loan term reduces monthly payment but increases total interest paid and pushes back your debt-free date. Refinancing into the same remaining term (25 years if you have 25 years left) preserves your payoff timeline while still benefiting from a lower rate.</li>
              <li><strong className="text-gray-900 dark:text-white">How Long You Plan to Stay:</strong> The break-even period is the minimum time you need to stay in the home for refinancing to pay off. If there is any chance you will sell or move within 2–3 years, refinancing is usually not worth the closing costs unless the break-even period is very short.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333344" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
