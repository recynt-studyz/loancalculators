import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StudentLoanCalculatorWrapper from '@/components/StudentLoanCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Student Loan Calculator — Payment & Payoff Planner',
  description: 'Calculate student loan monthly payments and total interest for federal and private loans. Free student loan calculator with repayment plan comparison.',
  alternates: { canonical: 'https://loancalculators.app/student-loan' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'What is the average student loan payment?', a: 'The average monthly student loan payment is around $350–$400 for borrowers on standard 10-year repayment plans, though this varies widely based on total debt, interest rate, and repayment plan. Graduate and professional school borrowers often face much higher payments — $600–$1,200/month — due to larger balances. Borrowers on income-driven repayment plans may pay much less monthly, though they pay longer and potentially more in total interest. Use this student loan calculator with your specific balance and rate to find your exact payment rather than relying on averages.' },
  { q: 'What is the difference between federal and private loans?', a: 'Federal student loans come with significant protections and flexibility that private loans lack. Federal loans offer income-driven repayment (IDR) plans, potential Public Service Loan Forgiveness (PSLF), deferment and forbearance options during hardship, and fixed interest rates set by Congress each year. Private loans are issued by banks and credit unions at variable or fixed rates based on your creditworthiness and co-signer — generally they offer no IDR options, limited forbearance, and no forgiveness programs. If you have both types, prioritize private loan repayment as they offer less safety net.' },
  { q: 'How do income-driven repayment plans work?', a: 'Income-driven repayment (IDR) plans cap your monthly student loan payment at a percentage of your discretionary income — typically 5–20% depending on the plan. Your discretionary income is generally the difference between your adjusted gross income and 150–225% of the federal poverty line for your family size. After 20–25 years of qualifying payments, any remaining balance may be forgiven (though the forgiven amount may be taxable). Available plans include SAVE (Saving on a Valuable Education), IBR (Income-Based Repayment), PAYE, and ICR. This calculator estimates the standard amortization payment, which is the baseline for comparison.' },
  { q: 'Can I pay off my student loans early?', a: 'Yes, and there is no prepayment penalty on federal or most private student loans. Paying extra each month reduces your principal faster, which lowers the interest that accrues and can save thousands of dollars over the loan life. Even an extra $50–$100 per month on a $38,000 balance can cut 1–2 years off your repayment and save $1,500–$3,000 in interest. When making extra payments, make sure your loan servicer applies the additional amount to principal rather than just advancing your next payment due date — you may need to specify this in your account or via written instruction.' },
  { q: 'What happens if I cannot make my student loan payment?', a: 'Federal loan borrowers have several options during financial hardship. Deferment temporarily suspends payments for up to 3 years if you are unemployed, enrolled in school, or facing economic hardship — though interest may continue to accrue on unsubsidized loans. Forbearance allows reduced or paused payments for up to 12 months at a time. Income-driven repayment can reduce your payment to as little as $0/month if your income qualifies. Private loan options vary by lender — most offer some form of forbearance, but it is more limited. Contact your servicer before missing a payment, as late payments can damage your credit score.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Student Loan Calculator',
  url: 'https://loancalculators.app/student-loan', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Student Loan Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter your loan balance and interest rate', text: 'Enter your total student loan balance and your current interest rate.' },
    { '@type': 'HowToStep', name: 'Choose federal or private and select repayment plan', text: 'Select whether your loans are federal or private. For federal loans, choose your repayment plan (Standard, Graduated, Extended, or Income-Based).' },
    { '@type': 'HowToStep', name: 'See your monthly payment and total interest', text: 'View your monthly payment, total amount paid, total interest, and payoff date instantly.' },
  ],
}

export default function StudentLoanPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Student Loan Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate student loan payments for federal and private loans across all repayment plans. See your payoff date and total interest instantly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111114" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <StudentLoanCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222225" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Plan your student loan repayment</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This student loan calculator helps you compare federal repayment plans and estimate your monthly payment and total interest for both federal and private loans. Federal loans offer Standard (10-year), Graduated, Extended (25-year), and Income-Based plans. Federal loans may also qualify for forgiveness programs — this calculator estimates standard repayment only. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Student Loan Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Student loan repayment math uses the same fixed-payment amortization formula as other loans, but federal loans offer multiple repayment structures that change the payment amount and total cost significantly. Understanding each plan helps you choose the right one for your financial situation.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <strong>Standard 10-year plan</strong> uses the PMT formula directly: Payment = P &times; r / (1 &minus; (1+r)^&minus;120), where n = 120 months. This plan pays the least total interest and is the default for federal borrowers. The <strong>Graduated plan</strong> starts with lower payments that increase every 2 years, costing more in total interest but easing cash flow when income is lower. The <strong>Extended 25-year plan</strong> reduces monthly payments substantially but dramatically increases total interest — often doubling the amount paid over the life of the loan.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Income-driven plans (SAVE, IBR, PAYE, ICR) are not based on amortization — they calculate your payment as a percentage of discretionary income, so the payment may not cover all accruing interest. The remaining unpaid interest may be forgiven after 20–25 years. This calculator shows the standard amortization-based plans; for IDR estimates, use your loan servicer&apos;s official calculator.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Priya graduated with $38,000 in federal Direct Unsubsidized Loans at a blended rate of 6.54% (the 2026 undergraduate rate). She wants to compare her Standard 10-year payment against the Extended 25-year plan to decide how aggressively to repay.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Standard 10-year plan:</strong> r = 6.54% / 12 = 0.545% per month, n = 120. Monthly payment = approximately <strong>$432/month</strong>. Total paid = $432 &times; 120 = $51,840. Total interest = $13,840.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Extended 25-year plan:</strong> Same rate, n = 300. Monthly payment drops to about <strong>$264/month</strong> — saving $168/month. But total paid = $264 &times; 300 = $79,200. Total interest = $41,200 — nearly three times more than the 10-year plan. For Priya, the Standard plan costs $27,000 less in total. If she can afford the $432 payment, the Standard plan is the clear financial choice. If cash flow is tight early in her career, Graduated repayment is a middle ground worth exploring.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Student Loan Payment</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Loan Balance:</strong> The total amount owed is the primary driver of payment size and total interest. Every extra semester of borrowing compounds the repayment burden. Borrowing conservatively and exhausting grants, scholarships, and work-study first reduces this starting balance significantly.</li>
              <li><strong className="text-gray-900 dark:text-white">Interest Rate:</strong> Federal undergraduate rates are set annually by Congress (6.54% for 2026). Graduate and PLUS loan rates are higher. Private loan rates vary by lender and creditworthiness, ranging from about 4% to over 14%. Unlike mortgages, you generally cannot negotiate a federal student loan rate.</li>
              <li><strong className="text-gray-900 dark:text-white">Repayment Plan:</strong> Choosing the right plan is the most impactful decision after graduation. Standard 10-year is cheapest overall; income-driven plans provide payment flexibility but can cost far more in total interest over 20–25 years.</li>
              <li><strong className="text-gray-900 dark:text-white">Loan Type (Federal vs. Private):</strong> Federal loans provide safety nets including IDR, forbearance, deferment, and potential forgiveness. Private loans generally offer none of these protections. Exhaust federal loan eligibility before considering private loans.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333336" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
