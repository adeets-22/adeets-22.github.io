import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditi",
  description: "Aditi's corner of the internet",
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
