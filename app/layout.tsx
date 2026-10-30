import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stockflow | Inventory management",
    template: "%s · Stockflow",
  },
  description:
    "Stockflow helps modern teams track stock across every warehouse, automate reordering, and turn inventory data into confident decisions.",
  keywords: [
    "inventory management",
    "warehouse management",
    "stock tracking",
    "inventory software",
    "purchase orders",
  ],
  authors: [{ name: "Stockflow" }],
  openGraph: {
    title: "Stockflow | Inventory management",
    description:
      "Track stock across every warehouse, automate reordering, and turn inventory data into confident decisions.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
