import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { exo, orbitron } from './lib/fonts';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Starfield from "react-starfield";

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
          <Starfield
            starCount={1000}
            speedFactor={0.05}
            starColor={[255, 255, 255]}
            backgroundColor="black"
          />
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}