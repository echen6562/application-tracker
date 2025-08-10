import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { exo, orbitron } from './lib/fonts';

export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "Track your job applications and their status",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${exo.variable} ${orbitron.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}