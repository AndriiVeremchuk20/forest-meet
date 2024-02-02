
import Loader from "@/components/loader";
import dynamic from "next/dynamic";

const AgoraProvider = dynamic(() => import("../../../providers/agora"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgoraProvider>{children}</AgoraProvider>;
}
