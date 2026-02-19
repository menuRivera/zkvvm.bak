import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import Web3Provider from "@/components/Web3Provider"
import Navbar from "@/components/Navbar"
import BackgroundEffects from "@/components/BackgroundEffects"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "ZK-vvm | Secure Payments",
  description: "ZK-Compliant Secure Payments Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white font-sans`}
      >
        <Web3Provider>
          <BackgroundEffects />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  )
}
