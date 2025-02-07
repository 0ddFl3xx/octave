import type { Metadata } from "next";

import CreditTag from "@/components/CreditTag";

import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "./providers";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <QueryProvider>{children}</QueryProvider>
          <CreditTag />
        </body>
      </html>
    </ClerkProvider>
  );
}
