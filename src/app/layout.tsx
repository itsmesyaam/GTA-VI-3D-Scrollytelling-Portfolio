import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Syam S // Technical Project Manager & Systems Architect | GTA VI Dossier',
  description:
    'High-conversion portfolio for Syam S. 4+ years leading cross-functional engineering squads across AI pipelines, scalable web platforms, and health-tech systems.',
  authors: [{ name: 'Syam S', url: 'https://www.syamsuresh.in' }],
  keywords: [
    'Technical Project Manager',
    'Systems Architect',
    'Full-Stack Architecture',
    'AI Pipeline Orchestration',
    'LangChain',
    'RAG',
    'Kochi Kerala India',
  ],
  openGraph: {
    title: 'Syam S // Technical Project Manager & Systems Architect',
    description:
      'Proven track record of accelerating release velocity by up to 40% and deploying enterprise-grade platforms.',
    url: 'https://www.syamsuresh.in',
    siteName: 'Syam S Dossier',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#07070C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07070C] text-gray-100 antialiased selection:bg-[#FF2A85] selection:text-white">
        {children}
      </body>
    </html>
  );
}
