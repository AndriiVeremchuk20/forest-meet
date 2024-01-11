import AgoraProvider from "@/providers/agora";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgoraProvider>{children}</AgoraProvider>;
}
