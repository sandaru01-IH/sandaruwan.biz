import type { Metadata } from "next";
import { Inter, Poppins, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandaruwan Sankalpa Silva — Urban Informatics & GIS Developer",
  description:
    "I design intelligence between cities, data, and human decisions. Urban Informatics, GIS Developer, Data Analyst, and Creative Technologist based in Sri Lanka.",
  keywords: [
    "GIS Developer",
    "Data Analyst",
    "Urban Informatics",
    "Spatial Analysis",
    "Data Visualisation",
    "ArcGIS",
    "QGIS",
    "Sri Lanka",
    "Sandaruwan Silva",
  ],
  authors: [{ name: "Sandaruwan Sankalpa Silva" }],
  openGraph: {
    title: "Sandaruwan Sankalpa Silva — Urban Informatics & GIS Developer",
    description:
      "I design intelligence between cities, data, and human decisions.",
    type: "website",
    url: "https://sandaruwan.biz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandaruwan Sankalpa Silva",
    description:
      "Urban Informatics · GIS Developer · Data Analyst · Creative Technologist",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} ${barlowCondensed.variable} font-sans bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
