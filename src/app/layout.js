import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata = {
  title: "Delicious Brownies and Waffles - Sapna Delights",
  description: "Indulge in freshly baked brownies and waffles at Sapna Delights. Perfectly crafted for every sweet tooth!",
  keywords: "brownies, waffles, bakery, Sapna Delights, fresh baked goods",
  author: "Sapna Delights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/bakery-logo.png" />
        <meta property="og:url" content="https://sapna-delights.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/bakery-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "Sapna Delights",
              url: "https://sapna-delights.vercel.app/",
              description: metadata.description,
              servesCuisine: "Bakery Items",
              address: {
                "@type": "PostalAddress",
                streetAddress: "456 Sweet St",
                addressLocality: "Baketown",
                addressRegion: "BK",
                postalCode: "67890",
                addressCountry: "US",
              },
              telephone: "+1234567891",
            }),
          }}
        />
      </Head>
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024, All Rights Reserved Sapna Delights
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
