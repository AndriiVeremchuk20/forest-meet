"use client";

import dynamic from "next/dynamic";

//import AgoraProvider from "@/providers/agora";

const AgoraProvider = dynamic(() => import("../../providers/agora"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgoraProvider>{children}</AgoraProvider>;
}
