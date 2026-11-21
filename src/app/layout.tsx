import type { Metadata } from "next";
import "./globals.css";

const title = "Aditi Sriram | COO at Para";
const description = "Aditi Sriram is COO and a founding team member at Para since late 2022. Her work spans wallet infrastructure, stablecoins, and payments for AI agents.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aditi.is"),
  title,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Aditi Sriram", url: "https://www.aditi.is/" }],
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description,
    siteName: "Aditi Sriram",
    firstName: "Aditi",
    lastName: "Sriram",
    images: [{ url: "/images/Headshot%201.jpg", alt: "Aditi Sriram, COO at Para" }],
  },
  twitter: {
    card: "summary",
    creator: "@adeets_22",
    title,
    description,
    images: ["/images/Headshot%201.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
