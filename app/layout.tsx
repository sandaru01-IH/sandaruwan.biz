import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandaruwan Sankalpa Silva | GIS Developer & Data Analyst",
  description: "Urban Informatics & Planning professional specializing in GIS technologies, data analysis, and AI-driven urban solutions.",
  keywords: ["GIS Developer", "Data Analyst", "Urban Informatics", "Spatial Analysis", "Data Visualization"],
  authors: [{ name: "Sandaruwan Sankalpa Silva" }],
  openGraph: {
    title: "Sandaruwan Sankalpa Silva | GIS Developer & Data Analyst",
    description: "Urban Informatics & Planning professional specializing in GIS technologies and data-driven methodologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
