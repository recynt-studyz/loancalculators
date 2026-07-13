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
  { q: 'How much should I have saved for retirement by age?', a: 'Fidelity recommends saving 1&times; your annual salary by age 30, 3&times; by 40, 6&times; by 50, 8&times; by 60, and 10&times; by age 67. On a $75,000 salary, that translates to $75K by 30, $225K by 40, $450K by 50, and $750K by retirement. These benchmarks assume you will replace about 45% of your income in retirement from savings (with Social Security providing the rest). They are guideposts, not hard rules — your actual retirement need depends on your planned spending, desired retirement age, health, and other income sources. Use this calculator to model your specific situation rather than relying on one-size-fits-all benchmarks.' },
  { q: 'What is the 4% retirement rule?', a: 'The 4% rule, developed from the "Trinity Study," suggests that retirees can withdraw 4% of their starting portfolio balance in year one, then adjust that amount for inflation each subsequent year, and have a very high probability (historically 95%+) that their portfolio lasts 30 years. A $1,000,000 portfolio at retirement supports $40,000/year in inflation-adjusted withdrawals. Some financial planners now recommend 3–3.5% for those retiring early (before 65) or expecting a 40+ year retirement, as the original study was based on 30-year horizons. The 4% rule is a starting point for planning, not a guarantee.' },
  { q: 'How much should I contribute to my 401k?', a: 'The minimum you should contribute is enough to capture your full employer match — anything less is leaving guaranteed free money on the table (an instant 50–100% return on that portion of your contribution). Beyond the match, aim for a total savings rate of 15% of gross income toward retirement, including employer contributions. The 2026 401k contribution limit is $23,500 per year for employees under 50 (plus a $7,500 catch-up contribution if you are 50 or older). If you cannot hit 15% right away, start with whatever you can and increase your contribution rate by 1% each year or whenever you get a raise.' },
  { q: 'What is employer match and how does it work?', a: 'Employer match is free money your employer contributes to your 401k when you contribute. A typical match is "50% up to 6% of salary" — if you earn $75,000 and contribute 6% ($4,500/year), your employer adds $2,250. Always contribute at least enough to capture the full match before directing money elsewhere. Employer contributions typically vest over time (often 3–5 years), meaning you must stay with the company for a period before the match money is fully yours. Check your plan\'s vesting schedule, especially if you are considering changing jobs, as unvested funds revert to the employer.' },
  { q: 'When can I retire comfortably?', a: 'Retirement readiness depends on your savings balance, expected annual expenses in retirement, Social Security benefits, any pension income, and your expected return on investments. A common benchmark is having 25&times; your annual retirement expenses saved — derived directly from the 4% rule. If you expect to spend $60,000/year in retirement, you need about $1.5 million. Social Security benefits can offset a significant portion of that need, reducing the required portfolio. Use this retirement calculator to project your balance year by year and see at what age your savings might cross your target threshold, then adjust your contribution rate or expected retirement age accordingly.' },
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

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Retirement Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Retirement projections use the future value of an annuity formula to model how regular contributions compound over time toward a final portfolio balance at retirement. The calculator adds employer match to your monthly contributions and compounds the entire balance at your expected annual return:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Total Monthly Contribution = Employee + Employer Match<br />
              FV = Current Balance &times; (1+r)^n + Monthly &times; [(1+r)^n &minus; 1] / r<br />
              Inflation-Adjusted = FV / (1 + inflation rate)^years
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Where r is the monthly investment return (annual rate / 12) and n is the total months until retirement. The calculator then applies an inflation adjustment (typically 2.5–3%) so you can see what your projected balance is worth in today&apos;s purchasing power. Finally, dividing the inflation-adjusted balance by 25 (the inverse of the 4% withdrawal rate) gives an estimate of sustainable annual retirement income.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              David is 30 years old and has $12,000 saved in his 401k. He earns $68,000/year and contributes 6% ($340/month). His employer matches 50% up to 6%, adding $170/month. Total monthly contribution: <strong>$510/month</strong>. He expects a 7% annual return and plans to retire at 65.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Over 35 years: r = 7%/12 = 0.583%/month, n = 420 months. Future value of his $12,000: $12,000 &times; (1.00583)^420 &asymp; $12,000 &times; 11.5 = $138,000. Future value of his $510/month contributions: $510 &times; [(11.5 &minus; 1) / 0.00583] = $510 &times; 1,800 = $918,000. <strong>Total projected balance: ~$1,056,000</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Inflation-adjusted at 2.5% over 35 years: $1,056,000 / (1.025)^35 = $1,056,000 / 2.37 = approximately <strong>$446,000 in today&apos;s dollars</strong>. At the 4% rule, that supports about $17,800/year or ~$1,480/month in real purchasing power. This is a starting point — increasing his contribution rate to 10% or more, or retiring at 67 instead of 65, dramatically improves the outcome.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Retirement Balance</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Time Horizon:</strong> Starting 10 years earlier can more than double your ending balance through the power of compound growth. Time is the most valuable asset in retirement planning — every year you delay saving has an outsized cost at retirement.</li>
              <li><strong className="text-gray-900 dark:text-white">Monthly Contribution Rate:</strong> Even small increases matter enormously over decades. Raising your contribution from 6% to 10% on a $68,000 salary adds $227/month now, but due to compounding, can add $400,000+ to your retirement balance over 35 years.</li>
              <li><strong className="text-gray-900 dark:text-white">Employer Match:</strong> Always contribute enough to capture the full employer match. An employer that matches 50% of your 6% contribution is effectively giving you an immediate 50% return on that money — far better than any investment return you could otherwise achieve.</li>
              <li><strong className="text-gray-900 dark:text-white">Expected Rate of Return:</strong> The assumed rate of return has a profound effect on projections. At 5% vs. 7% annual return, a 35-year projection on $510/month starting from $12,000 produces about $750,000 vs. $1,056,000 — a $300,000 difference. A diversified portfolio historically achieves 6–8% long-term, but there are no guarantees.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333342" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
