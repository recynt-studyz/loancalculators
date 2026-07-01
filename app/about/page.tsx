import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — loancalculators.app',
  description: 'About loancalculators.app — free financial calculators for mortgage, auto loan, personal loan, compound interest, salary, and more.',
  alternates: { canonical: 'https://loancalculators.app/about' },
}

export default function About() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat min-h-[200px]" style={{ backgroundImage: "url('/herobglc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-8">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl font-bold">About loancalculators.app</h1>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-8 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is loancalculators.app?</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                loancalculators.app is a free suite of financial calculators covering mortgage payments, auto loans, personal loans, student loans, compound interest, salary conversion, tip calculation, sales tax, credit card payoff, retirement planning, savings goals, refinancing, home affordability, debt-to-income ratio, and paycheck estimation. All 15 calculators are free, instant, and private.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All calculations run entirely in your browser using pure JavaScript math with standard financial formulas. No data is ever sent to a server. You can verify this by opening your browser&apos;s Network tab — you will see zero outbound requests when you use any calculator. Your numbers stay on your device.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Accuracy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We use standard financial formulas: the PMT formula for loan payments, compound interest formula for investment growth, and current tax brackets for paycheck estimates. Results are accurate for standard fixed-rate loans and investments. Variable-rate products, complex tax situations, or unusual loan structures may differ from estimates. Always consult a licensed financial advisor before making major financial decisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Since all calculations happen client-side, your financial information never leaves your device. We use Google AdSense for advertising, which may use cookies for ad personalization. We also use localStorage to remember your last inputs so returning visitors see their previous calculation. See our <a href="/privacy" className="text-green-700 dark:text-green-400 hover:underline">Privacy Policy</a> for details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                loancalculators.app provides educational financial calculators for informational purposes only. Results are estimates and should not be construed as financial, tax, legal, or investment advice. Always consult a qualified professional before making financial decisions. Tax rates, mortgage rates, and financial regulations change frequently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
