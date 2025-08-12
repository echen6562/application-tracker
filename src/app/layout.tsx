import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { exo, orbitron } from './lib/fonts';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Job Rocket",
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
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}