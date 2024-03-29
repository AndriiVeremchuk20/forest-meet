import "@/styles/globals.css";
import "aos/dist/aos.css";

import localFont from "next/font/local";
import AppSessionProvider from "@/providers/session";
import Header from "@/components/layout/header";
import AosProvider from "@/providers/aos";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";

// vercel tools
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// load font
const googlePixelifySans = localFont({
  src: "../../font/PixelifySans-VariableFont_wght.ttf",
});

export const metadata = {
  metadataBase: new URL("https://forest-meet.com/"),
  title: "Forest Meet",
  description:
    "Forest Meet is a real-time video meetup application created by create-t3-app. Enjoy virtual gatherings with friends around a cozy virtual campfire.",
  openGraph: {
    title: "Forest Meet",
    description:
      "Virtual gatherings with friends around a cozy virtual campfire.",
    url: "https://forest-meet.com/",
    siteName: "Forest Meet",
  },
  icons: [{ rel: "icon", url: "/img/icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${googlePixelifySans.className} scroll-smooth bg-[url('/img/bg_light.gif')] bg-cover bg-fixed text-xl text-black duration-300 selection:bg-green-800 selection:text-white dark:bg-[url('/img/bg_dark.gif')] dark:text-neutral-200`}
      >
        <AppSessionProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <AosProvider>
              <Header />
              {children}
            </AosProvider>
          </TRPCReactProvider>
        </AppSessionProvider>

        {/* vercel tools*/}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
