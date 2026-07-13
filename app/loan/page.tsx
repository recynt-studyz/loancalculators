import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import LoanCalculatorWrapper from '@/components/LoanCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Loan Calculator — Monthly Payment & Total Cost',
  description: 'Calculate monthly payments and total cost for any personal loan. Free loan calculator with amortization schedule. Instant results, no signup required.',
  alternates: { canonical: 'https://loancalculators.app/loan' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How is a loan monthly payment calculated?', a: 'A personal loan monthly payment uses the standard PMT formula: Payment = P × r / (1 – (1+r)^–n), where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments. This formula ensures your fixed payment fully amortizes the loan by the end of the term — meaning the final payment brings the balance to exactly zero. For a $15,000 loan at 9.5% over 3 years (36 months), the monthly payment works out to about $480. Our calculator runs this formula instantly, so you can test different amounts, rates, and terms in seconds.' },
  { q: 'What is the difference between APR and interest rate?', a: 'The interest rate is the annual cost of borrowing expressed as a percentage of the principal. APR (Annual Percentage Rate) includes the interest rate plus additional fees such as origination fees, giving you the true total cost of the loan on an annualized basis. A loan with a 9% interest rate and a 2% origination fee on a $10,000 loan effectively has an APR higher than 9%. When comparing loan offers from different lenders, always compare APRs rather than just stated interest rates — two loans with the same rate but different fees can have meaningfully different APRs and total costs.' },
  { q: 'How do I compare two different loan offers?', a: 'To compare loan offers accurately, look at three numbers: the APR (which captures both rate and fees), the monthly payment, and the total interest paid over the loan life. A lower interest rate does not always mean a lower total cost if one loan has a higher origination fee or a longer repayment term. Use this loan calculator to model each offer with the same parameters side by side. Also consider prepayment penalties — some lenders charge a fee if you pay off the loan early, which matters if you plan to pay it down faster than scheduled.' },
  { q: 'What happens if I pay extra on my loan?', a: 'Making extra payments on a personal loan reduces your principal balance faster, which directly lowers the amount of interest that accrues each month. Because interest is calculated on the outstanding balance, a lower balance means less interest charged with every payment — a compounding benefit. Even an extra $50–$100/month on a $15,000 loan can save hundreds of dollars in interest and cut months off the repayment term. Before making extra payments, confirm your lender applies them to principal rather than future payments, and check whether a prepayment penalty applies.' },
  { q: 'How does loan term length affect total cost?', a: 'A shorter loan term (2–3 years) means higher monthly payments but you pay far less total interest. A longer term (5–7 years) reduces your monthly payment significantly but costs much more in interest overall and keeps you in debt longer. For example, a $15,000 loan at 9.5% over 2 years has a monthly payment of about $686 and total interest of ~$470; stretched to 5 years the payment drops to ~$315 but total interest rises to ~$3,900. Use this calculator to compare total costs across terms — the difference is often surprising and can inform whether a longer term truly fits your situation.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Personal Loan Calculator',
  url: 'https://loancalculators.app/loan', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate a Personal Loan Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter loan amount and interest rate', text: 'Enter the amount you want to borrow and the annual interest rate offered by your lender.' },
    { '@type': 'HowToStep', name: 'Choose your loan term', text: 'Select how many years you want to repay the loan. Shorter terms mean higher payments but less total interest.' },
    { '@type': 'HowToStep', name: 'View payment breakdown and amortization', text: 'See your monthly payment, total interest, effective APR, and full amortization schedule instantly.' },
  ],
}

export default function LoanPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Loan Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your monthly loan payment and total cost for any personal loan. Instant results with full amortization schedule.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111112" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <LoanCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222223" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Understanding your personal loan payment</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Personal loan payments depend on three factors: the loan amount (principal), the annual interest rate, and the loan term. This loan calculator uses the standard amortization formula to give you exact monthly payments for fixed-rate loans. Include any origination fee to see the true effective APR and compare offers from multiple lenders accurately. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Personal Loan Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Personal loans use fixed-rate amortization, meaning every payment is the same dollar amount from the first month to the last. The PMT formula determines this payment:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Payment = P &times; r / (1 &minus; (1+r)^&minus;n)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Where <strong>P</strong> is the loan amount, <strong>r</strong> is the monthly interest rate (annual rate ÷ 12), and <strong>n</strong> is the total number of payments (term in months). Even though your payment stays constant, the split between principal and interest changes each month. Early payments are mostly interest; later payments are mostly principal. This is standard loan amortization.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you enter an origination fee, the calculator also shows your effective APR — the true annual cost of the loan including that fee. This is the number to compare across lenders, because a lower stated rate with a high origination fee can actually cost more than a slightly higher rate with no fee.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Marcus needs to consolidate $15,000 in credit card debt. His bank offers a personal loan at 9.5% APR with a 3-year (36-month) term and a 1% origination fee ($150). Using the PMT formula: r = 9.5% / 12 = 0.7917% per month, n = 36. His monthly payment is <strong>approximately $480</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Over 36 months he will pay $480 &times; 36 = $17,280 total, meaning he pays about <strong>$2,280 in interest</strong>. Compare that to carrying the same $15,000 on a credit card at 22% APR with a $300 minimum payment — he would take over 8 years and pay more than $12,000 in interest. The personal loan saves roughly $10,000 and gets him debt-free in 3 years.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Adding the $150 origination fee to the total cost, his effective APR is slightly above 9.5%. If a competing lender offers 10% with no origination fee, Marcus should compare total cost: $480/month &times; 36 = $17,280 vs. the competitor&apos;s slightly higher payment but no upfront fee. The loan calculator handles this comparison automatically when you enter the origination fee amount.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Loan Payment</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Loan Amount:</strong> The principal you borrow is the most direct driver of your monthly payment. Borrowing $20,000 instead of $15,000 adds roughly $160/month at 9.5% over 3 years. Borrow only what you need and can comfortably repay.</li>
              <li><strong className="text-gray-900 dark:text-white">Interest Rate:</strong> Rates on personal loans vary widely — from around 7% for excellent credit to 36% for poor credit. Even a 3% difference on a $15,000 loan can mean hundreds of dollars more in interest. Improving your credit score before applying is one of the most effective ways to lower your rate.</li>
              <li><strong className="text-gray-900 dark:text-white">Loan Term:</strong> Longer terms lower your monthly payment but increase total interest substantially. A 5-year term on $15,000 at 9.5% costs about $2,000 more in interest than a 3-year term, while only saving about $170/month. Run the numbers in the calculator to find the right balance.</li>
              <li><strong className="text-gray-900 dark:text-white">Origination Fees:</strong> Many lenders charge 1–8% of the loan amount as an origination fee, deducted from the disbursement or added to the balance. This fee effectively raises your APR and should always be factored into your comparison.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333334" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
