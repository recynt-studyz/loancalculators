import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loan Calculators — Free Financial Calculator Suite',
  description:
    'Free loan calculators for mortgage, auto, personal loan, student loan, compound interest, salary, tip, sales tax, credit card payoff and more. Instant, private, no signup.',
  keywords: [
    'loan calculator',
    'mortgage calculator',
    'auto loan calculator',
    'compound interest calculator',
    'salary calculator',
    'loan calculators',
    'financial calculator',
    'tip calculator',
    'sales tax calculator',
    'credit card payoff calculator',
    'retirement calculator',
    'refinance calculator',
    'DTI calculator',
    'paycheck calculator',
    'home affordability calculator',
  ],
  metadataBase: new URL('https://loancalculators.app'),
  alternates: { canonical: 'https://loancalculators.app' },
  openGraph: {
    title: 'Loan Calculators — Free Financial Calculator Suite',
    description:
      'Free loan calculators for mortgage, auto, personal loan, compound interest, salary, tip, sales tax and more. Instant results, no signup.',
    url: 'https://loancalculators.app',
    siteName: 'loancalculators.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Loan & Financial Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculators — Free Financial Calculator Suite',
    description: 'Free financial calculators for mortgage, loans, compound interest, salary and more. No signup.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8792838105001561" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('loancalculators-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8792838105001561"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
