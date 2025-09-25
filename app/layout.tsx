import { ReactNode } from 'react'
import '../styles/globals.css'

export const metadata = {
  title: 'Nujuum Arts - Make Your Home Amazing with Art',
  description: 'Discover beautiful canvas and fine art paintings to transform your space. Shop our curated collection of artwork for your home and office.',
  keywords: ['art gallery', 'canvas paintings', 'fine art', 'home decor', 'wall art', 'nujuum arts'],
  authors: [{ name: 'Nujuum Arts', url: 'https://nujuumarts.com' }],
  creator: 'Nujuum Arts',
  publisher: 'Nujuum Arts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nujuumarts.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nujuum Arts - Make Your Home Amazing with Art',
    description: 'Discover beautiful canvas and fine art paintings to transform your space',
    url: 'https://nujuumarts.com',
    siteName: 'Nujuum Arts',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nujuum Arts - Beautiful Art Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nujuum Arts - Make Your Home Amazing with Art',
    description: 'Discover beautiful canvas and fine art paintings to transform your space',
    images: ['/og-image.png'],
  },
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
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}