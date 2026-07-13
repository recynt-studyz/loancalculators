import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MortgageCalculatorWrapper from '@/components/MortgageCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment & Amortization Schedule',
  description:
    'Calculate your monthly mortgage payment with taxes, insurance and PMI. Free mortgage calculator with amortization schedule. Instant results, no signup.',
  alternates: { canonical: 'https://loancalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How do I calculate my monthly mortgage payment?', a: 'Your monthly mortgage payment is calculated using the PMT formula: Payment = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the loan principal, r is the monthly interest rate, and n is the number of payments. For a $280,000 loan at 6.5% over 30 years, the monthly P&I payment works out to about $1,770. Our mortgage calculator runs this formula instantly as you type, so you always see an accurate result without needing to do the math yourself. Adding property taxes, homeowner\'s insurance, and PMI gives you the full PITI payment you\'ll actually owe each month.' },
  { q: 'What is included in a mortgage payment?', a: 'A full mortgage payment (PITI) includes four components: Principal (the portion that reduces your loan balance), Interest (the lender\'s charge for borrowing), Taxes (property taxes, typically collected monthly and held in escrow until the annual bill is due), and Insurance (homeowner\'s insurance, also escrowed). If your down payment is less than 20%, PMI (private mortgage insurance) is added as a fifth item, usually costing 0.5%–1.5% of the loan amount per year. Understanding all four components is important because the sticker price of a home doesn\'t tell you what you\'ll actually pay each month. Our calculator lets you enter each component separately so you can see the true cost of ownership.' },
  { q: 'What is PMI and when do I need it?', a: 'PMI (Private Mortgage Insurance) is required by most lenders when your down payment is less than 20% of the home price. It protects the lender — not you — if you default on the loan. PMI typically costs 0.5%–1.5% of the loan amount annually, which on a $300,000 loan is $1,500–$4,500 per year, or $125–$375 per month added to your payment. Once you reach 20% equity in your home (either through payments or appreciation), you can request PMI removal under the Homeowners Protection Act. For FHA loans, mortgage insurance premiums (MIP) work differently and may last the life of the loan unless you refinance.' },
  { q: 'How does the loan term affect my mortgage payment?', a: 'A longer loan term (30 years) means lower monthly payments but you pay significantly more total interest over the life of the loan. A 15-year mortgage carries higher monthly payments — often 30–40% more — but you pay roughly half the total interest and build equity much faster. For example, a $280,000 loan at 6.5% costs about $1,770/month over 30 years (total interest: ~$357,000) versus about $2,440/month over 15 years (total interest: ~$159,000). The 15-year option saves nearly $200,000 in interest. Use the amortization table in our calculator to compare terms side by side and decide which tradeoff fits your financial goals.' },
  { q: 'What is an amortization schedule?', a: 'An amortization schedule shows exactly how each monthly payment is divided between principal and interest throughout the life of your loan. In the early years of a 30-year mortgage, the vast majority of each payment goes to interest — sometimes 80–90% in the first few years. Over time, as the principal balance decreases, more of each payment goes toward principal and less toward interest. This shift is called amortization. Our mortgage calculator generates a full year-by-year amortization table so you can see your remaining balance at any point in the loan, which is useful for planning refinancing, extra payments, or understanding how much equity you\'ve built.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Calculator',
  url: 'https://loancalculators.app',
  description: 'Free mortgage calculator with monthly payment breakdown, amortization schedule, and PMI calculation.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Mortgage Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter your home price and down payment', text: 'Enter the home purchase price and your down payment amount. The calculator automatically computes your loan amount and shows if PMI is required.' },
    { '@type': 'HowToStep', name: 'Set your interest rate and loan term', text: 'Enter your interest rate and choose your loan term (10, 15, 20, or 30 years). Include property tax, insurance, and HOA fees for a complete PITI payment.' },
    { '@type': 'HowToStep', name: 'View your monthly payment and amortization schedule', text: 'Your total monthly mortgage payment appears instantly, with a full breakdown and year-by-year amortization schedule showing principal, interest, and remaining balance.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobglc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Mortgage Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your monthly mortgage payment with taxes, insurance, and PMI. Full amortization schedule included. Instant results, no signup.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <MortgageCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* Below hero */}
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '🎯', label: 'Accurate', sub: 'Standard financial formulas' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">
              Why use a mortgage calculator before you buy?
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              A mortgage calculator helps you understand the true cost of homeownership before signing. By entering your home price, down payment, interest rate, and loan term, you can see your exact monthly payment including principal and interest, property taxes, homeowner&apos;s insurance, and PMI. Comparing different loan terms shows how a 15-year mortgage vs a 30-year mortgage affects both your monthly cash flow and total interest paid. All calculations run entirely in your browser — your financial data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Mortgage Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              At the core of every mortgage payment is the PMT (payment) formula from financial mathematics. It calculates a fixed monthly payment that, over the life of the loan, fully repays both the principal borrowed and all accrued interest. The formula is:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Payment = P &times; [r(1+r)^n] / [(1+r)^n &minus; 1]
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Here, <strong>P</strong> is the loan principal (home price minus down payment), <strong>r</strong> is the monthly interest rate (annual rate divided by 12), and <strong>n</strong> is the total number of monthly payments (loan term in years multiplied by 12). This gives you the principal and interest (P&amp;I) portion of your payment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The full PITI payment adds property taxes (typically 0.5%–2% of home value per year, divided by 12), homeowner&apos;s insurance (around $100–$200/month), and PMI if your down payment is under 20%. Amortization — the process by which each payment shifts over time from mostly interest to mostly principal — is shown in the year-by-year breakdown table below the calculator results.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Sarah is buying a $350,000 home in Arizona with a 20% down payment ($70,000), leaving a loan amount of $280,000. Her lender quotes a 6.5% interest rate on a 30-year fixed mortgage. Property taxes in her county run about 0.7% of the home value per year ($2,450/year or ~$204/month), and her homeowner&apos;s insurance is $130/month.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Plugging into the PMT formula: r = 6.5% / 12 = 0.5417% per month, n = 360 payments. The P&amp;I payment comes to approximately <strong>$1,770/month</strong>. Adding taxes ($204) and insurance ($130) brings her total PITI payment to about <strong>$2,104/month</strong>. Because her down payment is exactly 20%, no PMI is required.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Over 30 years, Sarah will pay roughly $637,000 in total — $280,000 in principal and about $357,000 in interest. If she had chosen a 15-year term instead, her P&amp;I payment would rise to about $2,440/month but total interest paid would drop to around $159,000, saving nearly $200,000 over the life of the loan. The amortization table in the calculator makes this comparison visible at a glance.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Mortgage Payment</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Interest Rate:</strong> Even a 0.5% difference in rate has a large impact over 30 years. On a $280,000 loan, the difference between 6.0% and 6.5% is about $85/month — over $30,000 in extra interest over the life of the loan. Your rate depends heavily on your credit score, loan type, and market conditions.</li>
              <li><strong className="text-gray-900 dark:text-white">Down Payment:</strong> A larger down payment reduces the loan amount, lowers your monthly payment, eliminates PMI at 20%+, and typically earns you a better interest rate. Going from 10% to 20% down on a $350,000 home cuts your loan by $35,000 and removes PMI of roughly $100–$200/month.</li>
              <li><strong className="text-gray-900 dark:text-white">Loan Term:</strong> A 30-year term spreads payments out for lower monthly costs; a 15-year term costs more per month but dramatically reduces total interest paid. Most buyers choose 30 years for cash flow flexibility, but 15-year loans are significantly cheaper in total cost.</li>
              <li><strong className="text-gray-900 dark:text-white">Property Taxes and Insurance:</strong> These vary widely by location and add $200–$600/month or more to your payment. High-tax states like New Jersey or Illinois can push PITI payments 30–50% above the base P&amp;I amount.</li>
              <li><strong className="text-gray-900 dark:text-white">Credit Score:</strong> Borrowers with scores above 760 typically receive the lowest available rates, while scores below 680 may result in rates 1–2% higher. Improving your credit score before applying is one of the highest-return actions you can take before buying a home.</li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
