import type { Metadata } from "next";

import CreditTag from "@/components/CreditTag";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Octave — Tune in. Turn up.",
  description: "Welcome to Octave, your all in one music streaming platform!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CreditTag />
      </body>
    </html>
  );
}
