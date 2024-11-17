import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "./globals.css";

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
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
