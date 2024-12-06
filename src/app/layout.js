import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

// const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: "Unique Collections - Premium Menswear for Every Occasion",
  description: "Explore a wide range of stylish menswear at Unique Collections. From formal wear to casual streetwear, perfect for every modern man in Kalyan, Mumbai.",
  keywords: "menswear, premium clothing, unique collections, fashion, formal wear, streetwear, Kalyan, Mumbai, Maharashtra, India",
  author: "Unique Collections",
  image: "/menswear-logo.png",
  url: "https://unique-collections.vercel.app/",
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
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "Unique Collections",
              url: metadata.url,
              description: metadata.description,
              servesCuisine: "Menswear",
              address: {
                "@type": "PostalAddress",
                streetAddress: "456 Fashion St",
                addressLocality: "Kalyan",
                addressRegion: "Maharashtra",
                postalCode: "421301",
                addressCountry: "IN",
              },
              telephone: "+912512345678",
            }),
          }}
        />
      </Head>
      <body className={montserrat.className}>
        <main className="max-w-5xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2025, All Rights Reserved Unique Collections
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
