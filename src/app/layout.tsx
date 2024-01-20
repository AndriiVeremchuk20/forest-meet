import "@/styles/globals.css";

import localFont from "next/font/local";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import AppSessionProvider from "@/providers/session";
import Header from "@/components/layout/header";

// vercel tools
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// load font
const googlePixelifySans = localFont({
  src: "../../font/PixelifySans-VariableFont_wght.ttf",
});

export const metadata = {
  title: "Forest Meet",
  description:
    "Forest Meet is a real-time video meetup application created by create-t3-app. Enjoy virtual gatherings with friends around a cozy virtual campfire.",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${googlePixelifySans.className} bg-[url('/bg_light.gif')] bg-cover bg-fixed text-xl text-black`}
      >
        <AppSessionProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Header />
            {children}
          </TRPCReactProvider>
        </AppSessionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
