"use client";
import { UserPreview } from "@/components/user-preview";
import { api } from "@/trpc/react";
import { useRTCClient } from "agora-rtc-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LobbyPage = () => {
  const router = useRouter();
  const session = useSession();
  const client = useRTCClient();

  const generateTokenMutation = api.agora.generateToken.useMutation({
    onSuccess(data) {
      console.log(data);
      router.push(
        `/meet/room?id=${data.channelName}&token=${data.token}&uid=${data.uid}`,
      );
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const onCreateClick = () => {
    if (session.data?.user) {
      console.log(client.uid);
      generateTokenMutation.mutate({
        channelName: "room2",
        role: "publisher",
        expireTime: 400,
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      Home page of user: {session.data?.user.name}
      <UserPreview />
      <div className="space-x-2">
        <button className="">Join</button>
        <button onClick={onCreateClick}>Create</button>
      </div>
    </main>
  );
};

export default LobbyPage;
