import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DTICalculatorWrapper from '@/components/DTICalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'DTI Calculator — Debt-to-Income Ratio Calculator',
  description: 'Calculate your debt-to-income ratio for mortgage and loan qualification. Free DTI calculator with front-end and back-end ratio breakdown.',
  alternates: { canonical: 'https://loancalculators.app/dti' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'What is a good debt-to-income ratio?', a: 'A DTI ratio below 36% is generally considered excellent by lenders. Ratios between 36%–43% are acceptable for most conventional mortgages. Above 43% is considered high-risk by most traditional lenders and makes approval difficult, though FHA loans allow up to 50% DTI with compensating factors. Under 20% DTI is ideal and gives you maximum flexibility and the best loan terms. Our DTI calculator shows both your front-end and back-end ratios with a clear status indicator so you can see exactly where you stand before applying for any loan.' },
  { q: 'How do lenders calculate DTI?', a: 'Lenders calculate DTI by dividing your total monthly debt obligations by your gross monthly income (before taxes and deductions). They use two versions: the front-end ratio (housing costs only divided by income) and the back-end ratio (all monthly debts divided by income). Lenders use your full minimum required payment on each debt, not how much you choose to pay. For credit cards, they use the minimum payment shown on your statement. For revolving lines of credit with no balance, most lenders count $0 since there is no required payment.' },
  { q: 'What is front-end vs back-end DTI?', a: 'Front-end DTI (also called the housing ratio) includes only your proposed housing costs: principal, interest, property taxes, homeowner\'s insurance, PMI if applicable, and HOA fees. Lenders want this under 28% for conventional loans. Back-end DTI (the total debt ratio) adds all other monthly debt payments to your housing costs: car loans, student loans, credit card minimums, personal loans, alimony, and child support. Lenders want this under 36%–43%. Both ratios matter — a borrower can have a good front-end DTI but be disqualified due to high back-end DTI from other debts.' },
  { q: 'Can I get a mortgage with high DTI?', a: 'Getting approved with high DTI (above 43%) becomes increasingly difficult with conventional lenders but is not impossible. FHA loans allow back-end DTI up to 50% with compensating factors such as a credit score above 720, a large down payment (10%+), significant cash reserves (3–6 months of mortgage payments), or a history of low housing costs relative to income. VA loans and USDA loans also have more flexibility around DTI. Some portfolio lenders — banks that hold loans in-house rather than selling them — apply their own underwriting standards and may approve higher DTIs for otherwise strong borrowers.' },
  { q: 'How can I lower my debt-to-income ratio?', a: 'There are two ways to lower DTI: reduce your monthly debt payments or increase your gross income. To reduce debts: pay off credit card balances entirely (minimum payments disappear), pay off or pay down small loans, refinance existing debt to lower payments, or avoid taking on any new debt before applying. To increase income: document all income sources (rental income, freelance, bonuses, alimony received), ask for a raise, take on part-time work, or wait until a scheduled raise takes effect. Even modest income increases have a meaningful impact on DTI percentage. For example, a $300/month income increase on a base of $6,000/month shifts DTI by 5 percentage points.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'DTI Calculator',
  url: 'https://loancalculators.app/dti', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Debt-to-Income Ratio',
  step: [
    { '@type': 'HowToStep', name: 'Enter your gross monthly income', text: 'Enter your total gross monthly income before taxes and deductions.' },
    { '@type': 'HowToStep', name: 'Enter all monthly debt payments', text: 'Enter your monthly housing payment (mortgage or rent), car payment, student loans, credit card minimum payments, and any other monthly debt obligations.' },
    { '@type': 'HowToStep', name: 'See your front-end and back-end DTI', text: 'View your front-end DTI (housing only) and back-end DTI (all debts) with a status indicator showing what lenders expect.' },
  ],
}

export default function DTIPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">DTI Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your debt-to-income ratio and see if you qualify for a mortgage. Instant front-end and back-end DTI with lender benchmarks.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111124" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <DTICalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222235" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Know your DTI before applying for a mortgage</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Debt-to-income ratio (DTI) is one of the most important factors lenders evaluate when approving loans. This DTI calculator shows both your front-end ratio (housing costs only) and back-end ratio (all debts), with instant feedback on where you stand relative to lender standards. Check your DTI before applying for a mortgage so you know whether to pay down debts first or if you are already in a strong position to qualify. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the DTI Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Debt-to-income ratio is calculated by dividing your total monthly debt obligations by your gross monthly income and expressing the result as a percentage. There are two versions that lenders evaluate separately:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Front-End DTI = Monthly Housing Costs &divide; Gross Monthly Income<br />
              Back-End DTI = All Monthly Debt Payments &divide; Gross Monthly Income
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Housing costs for the front-end ratio include your proposed mortgage P&amp;I, property taxes, homeowner&apos;s insurance, PMI (if down payment is under 20%), and any HOA dues. Back-end DTI adds all other recurring debt obligations: car loans, student loan payments, credit card minimum payments, personal loans, alimony, and child support. The calculator shows both ratios simultaneously with color-coded status (green/yellow/red) against standard lender thresholds.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Tom earns $6,500/month gross. He is applying for a mortgage with a $1,650/month PITI payment (including taxes and insurance). He also has a $380/month car payment, $210/month student loan minimum, and $75/month credit card minimum.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Front-end DTI:</strong> $1,650 / $6,500 = <strong>25.4%</strong> ✓ (under 28% limit — good).<br />
              <strong>Back-end DTI:</strong> ($1,650 + $380 + $210 + $75) / $6,500 = $2,315 / $6,500 = <strong>35.6%</strong> ✓ (just under 36% limit — acceptable).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Tom qualifies under the 36% guideline, but barely. If his target home were $30,000 more expensive (adding $190/month to PITI), his back-end DTI would jump to 38.5% — still approvable for most conventional loans up to 43–45%, but tighter. If Tom paid off the $75/month credit card minimum before applying, his back-end DTI would drop to 34.4%, giving him a comfortable margin and potentially improving his loan offer.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your DTI Ratio</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Gross Monthly Income:</strong> DTI is calculated on gross (pre-tax) income, which is why it can feel counterintuitive — a 35% DTI sounds manageable until you realize your after-tax income might be 25–30% lower. A higher gross income directly lowers your DTI percentage, giving you more purchasing power.</li>
              <li><strong className="text-gray-900 dark:text-white">Existing Debt Payments:</strong> Each existing monthly obligation directly increases your back-end DTI. Eliminating a $400/month car payment before applying is equivalent to earning roughly $1,100 more per month in terms of mortgage qualifying power at a 36% back-end DTI limit.</li>
              <li><strong className="text-gray-900 dark:text-white">Proposed Housing Payment:</strong> The size of the mortgage you are applying for determines your front-end DTI. A lower-priced home or a larger down payment reduces the proposed payment and improves both front-end and back-end DTI simultaneously.</li>
              <li><strong className="text-gray-900 dark:text-white">Credit Cards with No Balance:</strong> Credit cards with no balance generally do not count toward DTI since there is no required monthly payment. However, large available credit lines on credit cards can affect lender risk assessment in some programs — it is worth asking your loan officer about this.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333346" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
