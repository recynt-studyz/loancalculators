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
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only earns on the original principal, compound interest grows exponentially — your interest earns interest. This "compounding effect" is why long-term investments grow so dramatically: a $10,000 investment at 7% simple interest for 30 years grows to $31,000, while the same investment at 7% compound interest grows to over $76,000. The difference of $45,000 is entirely the result of compounding — interest earning interest over time.' },
  { q: 'How often does compound interest compound?', a: 'Compound interest can compound daily, monthly, quarterly, or annually. The more frequently it compounds, the more interest you earn, because each compounding period adds to the base on which future interest is calculated. Daily compounding earns slightly more than monthly, which earns more than annual at the same stated annual rate. For most savings accounts and investment accounts, monthly compounding is standard. Our compound interest calculator lets you select any compounding frequency so you can compare the real difference in final value.' },
  { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick mental math shortcut for estimating how long it takes to double your money at a given interest rate. Simply divide 72 by your annual interest rate: at 6%, your money doubles in 72 ÷ 6 = 12 years; at 9%, it doubles in 72 ÷ 9 = 8 years; at 12%, in about 6 years. The rule works best for rates between 4% and 15% and assumes compound growth. It is useful for quickly evaluating investment opportunities or the cost of debt — a credit card at 24% APR doubles what you owe in just 3 years if unpaid.' },
  { q: 'How does compound interest differ from simple interest?', a: 'Simple interest is calculated only on the original principal: Interest = Principal &times; Rate &times; Time. Compound interest also earns interest on previously accumulated interest, which creates exponential rather than linear growth. Over short periods, the difference is small. Over long periods, it becomes enormous. $10,000 at 7% simple interest for 30 years grows to $31,000. At 7% compound interest it grows to $76,122 — a difference of $45,000. This is why starting to invest early matters so much: you gain not just more years, but exponentially more compounding cycles.' },
  { q: 'What is a good annual return to expect?', a: 'Historically, the U.S. stock market (S&P 500) has returned about 10% annually before inflation, or about 7% after inflation adjustment. High-yield savings accounts currently offer 4–5% APY. CDs offer 4–5% depending on term. Bonds average 2–4%. The "right" expected return depends on your asset allocation, risk tolerance, and time horizon. For long-term retirement projections, most financial planners use 6–7% real returns for a diversified stock/bond portfolio. This calculator defaults to 7% as a commonly used conservative long-term estimate — always remember that past returns do not guarantee future results.' },
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

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Compound Interest Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Compound interest is calculated using the future value formula, which accounts for both the growth of an initial lump sum and the accumulation of regular contributions over time. For a lump sum alone:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              A = P &times; (1 + r/n)^(n&times;t)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Where <strong>A</strong> is the future value, <strong>P</strong> is the principal, <strong>r</strong> is the annual interest rate, <strong>n</strong> is the number of compounding periods per year, and <strong>t</strong> is the time in years. For regular monthly contributions (PMT), the future value of an annuity formula is added:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              FV of contributions = PMT &times; [(1 + r/n)^(n&times;t) &minus; 1] / (r/n)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The total future value is the sum of both formulas. The calculator runs this for each year to produce the year-by-year growth table, showing exactly how much of your total balance comes from contributions versus compound growth.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Elena is 28 years old and starts investing with $5,000 already saved. She contributes $300/month to an index fund averaging 7% annual return, compounded monthly. She plans to invest for 25 years until age 53.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Future value of her $5,000 lump sum: $5,000 &times; (1 + 0.07/12)^300 = $5,000 &times; 5.75 = approximately <strong>$28,750</strong>. Future value of her $300/month contributions over 25 years: $300 &times; [(5.75 &minus; 1) / (0.07/12)] = $300 &times; 814 = approximately <strong>$244,200</strong>. Total portfolio: roughly <strong>$272,950</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Her total contributions over 25 years were $5,000 + ($300 &times; 300 months) = $5,000 + $90,000 = <strong>$95,000</strong>. The remaining <strong>~$178,000</strong> came entirely from compound growth — money that earned returns on previous returns. If she had started 5 years later at age 33, her ending balance would be roughly $185,000 — a $88,000 difference from just 5 fewer years of compounding.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Investment Growth</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Time Horizon:</strong> Time is the most powerful variable in compound interest. The longer your money compounds, the more exponential the growth. Starting 10 years earlier can more than double your ending balance, even at the same monthly contribution rate.</li>
              <li><strong className="text-gray-900 dark:text-white">Interest Rate / Expected Return:</strong> A 1–2% higher return makes an enormous difference over decades. At 6%, $300/month for 25 years grows to about $208,000. At 8%, it grows to about $342,000 — a $134,000 difference from just 2% more annual return.</li>
              <li><strong className="text-gray-900 dark:text-white">Monthly Contribution:</strong> Regular contributions are often more impactful than the initial lump sum because each contribution compounds over its own remaining time. Increasing your monthly contribution by $100 can add tens of thousands to your ending balance.</li>
              <li><strong className="text-gray-900 dark:text-white">Compounding Frequency:</strong> Daily compounding earns slightly more than monthly, which earns more than annual. The practical difference between daily and monthly compounding at 7% over 25 years is about 0.06% — meaningful but not dramatic. The rate and time horizon matter far more.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333337" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
