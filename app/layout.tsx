import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://saptak.saptech.online'),
  title: {
    default: 'Saptak Roy Akash | Fullstack Developer, Cyber Security & IoT Specialist',
    template: '%s | Saptak Roy Akash',
  },
  description:
    'Saptak Roy Akash — Fullstack Developer, Cyber Security & IoT Specialist, and Startup Founder building secure, scalable systems.',
  keywords: [
    'Saptak Roy Akash',
    'fullstack developer',
    'cyber security',
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
    'saptech',
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
    title: 'Saptak Roy Akash | Fullstack Developer, Cyber Security & IoT Specialist',
    description:
      'Fullstack Developer, Cyber Security Researcher, IoT & Robotics Engineer, AI Engineer, and Startup Founder. Building secure, scalable systems and businesses.',
    url: 'https://saptak.saptech.online',
    siteName: 'Saptak Roy Akash — Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saptak Roy Akash | Fullstack Developer & Cyber Security',
    description:
      'Fullstack Developer, Cyber Security Researcher, IoT & Robotics Engineer, and Startup Founder.',
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

export const viewport = {
  themeColor: '#0a0a0f',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saptak Roy Akash',
  url: 'https://saptak.saptech.online',
  jobTitle: 'Fullstack Developer & Cyber Security Specialist',
  description:
    'Fullstack Developer, Cyber Security Researcher, IoT & Robotics Engineer, AI Engineer, and Startup Founder.',
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
    'https://github.com/saptak',
    'https://linkedin.com/in/saptak',
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
