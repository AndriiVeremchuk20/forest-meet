import "@/styles/globals.css";

import localFont from "next/font/local";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import AppSessionProvider from "@/providers/session";

const googlePixelifySans = localFont({src: "../../font/PixelifySans-VariableFont_wght.ttf"});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
            {children}
          </TRPCReactProvider>
        </AppSessionProvider>
      </body>
    </html>
  );
}
