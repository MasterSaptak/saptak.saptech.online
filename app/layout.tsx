import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL('https://saptak.saptech.online'),
  title: {
    default: 'Saptak Roy Akash | Saptech | Fullstack Developer & Cyber Security Specialist',
    template: '%s | Saptak Roy Akash | Saptech',
  },
  description:
    'Saptak Roy Akash (Saptech) — Fullstack Developer, Cyber Security Researcher, and Startup Founder building secure, scalable intelligent systems. Explore Saptak Roy\'s portfolio at saptak.saptech.online.',
  keywords: [
    'Saptak',
    'Saptak Roy',
    'Saptech',
    'Saptak Roy Akash',
    'Saptak.saptech.online',
    'Saptak Portfolio',
    'Saptak Roy Developer',
    'Saptak Roy Cyber Security',
    'fullstack developer',
    'cyber security researcher',
    'IoT specialist',
    'robotics engineer',
    'AI engineer',
    'startup founder',
    'web developer',
    'embedded systems',
    'machine learning',
    'React developer',
    'Next.js developer',
    'portfolio',
  ],
  authors: [{ name: 'Saptak Roy Akash', url: 'https://saptak.saptech.online' }],
  creator: 'Saptak Roy Akash',
  publisher: 'Saptak Roy Akash',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://saptak.saptech.online',
  },
  openGraph: {
    title: 'Saptak Roy Akash | Saptech | Fullstack Developer & Cyber Security',
    description:
      'Explore the portfolio of Saptak Roy Akash (Saptech). Specialized in Fullstack Development, Cyber Security, IoT, and Robotics. Building the next generation of secure systems.',
    url: 'https://saptak.saptech.online',
    siteName: 'Saptak Roy Akash — Saptech Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saptak Roy Akash | Saptech | Fullstack Developer & Cyber Security',
    description:
      'Fullstack Developer, Cyber Security Researcher, IoT & Robotics Engineer, and Startup Founder. Saptak Roy Akash - Saptech.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saptak Roy Akash',
  alternateName: ['Saptak', 'Saptech', 'Saptak Roy'],
  url: 'https://saptak.saptech.online',
  description: 'Fullstack Developer, Cyber Security Researcher, IoT & Robotics Engineer, and Startup Founder.',
  jobTitle: 'Fullstack Developer & Cyber Security Specialist',
  brand: {
    '@type': 'Brand',
    name: 'Saptech',
  },
  alumniOf: 'Heritage Institute of Technology',
  knowsAbout: [
    'Full-Stack Development',
    'Cyber Security',
    'IoT',
    'Robotics',
    'Artificial Intelligence',
    'Machine Learning',
    'Embedded Systems',
    'React',
    'Next.js',
    'Node.js',
    'Python',
  ],
  sameAs: [
    'https://github.com/saptakroyakash',
    'https://linkedin.com/in/saptakroyakash',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
