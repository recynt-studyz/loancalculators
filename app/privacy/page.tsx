import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — loancalculators.app',
  description: 'Privacy policy for loancalculators.app — how we handle your data on our free financial calculator suite.',
  alternates: { canonical: 'https://loancalculators.app/privacy' },
}

export default function Privacy() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat min-h-[200px]" style={{ backgroundImage: "url('/herobglc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-8">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-8 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-gray-400 mb-8">Last updated: July 1, 2026</p>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                loancalculators.app does not collect, store, or transmit your financial information. All calculator inputs and outputs are processed entirely within your browser using JavaScript. Your numbers never leave your device or reach our servers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                We use <strong className="text-gray-700 dark:text-gray-300">localStorage</strong> in your browser to remember your last calculator inputs so you see your previous calculation when you return. This data is stored only on your device and is never transmitted to us or any third party.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advertising (Google AdSense)</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We display advertisements through Google AdSense (publisher ID: ca-pub-8792838105001561). Google AdSense may use cookies and similar technologies to serve ads based on your prior visits to our website and other sites on the internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-green-700 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may use standard web analytics to understand aggregate usage patterns (such as which calculators are most popular). Any analytics data is aggregate and anonymized and does not identify individual users.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We use localStorage (not cookies) to save your calculator preferences and last inputs on your device. Google AdSense may set cookies for ad serving and measurement. You can control cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                loancalculators.app is not directed at children under 13. We do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                For privacy-related questions, please use the Contact link in the footer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
