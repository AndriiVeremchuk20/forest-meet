"use client";

import Loader from "@/components/loader";
import { Button, Box, Modal } from "@/components/common";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { JoinForm } from "@/components/form/join";
import { CampFireIcon, MatchIcon } from "@/components/svgs";

const LobbyPage = () => {
  const router = useRouter();

  const { status } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { isLoading: createLoading, mutate } = api.agora.createRoom.useMutation(
    {
      onSuccess: async ({ channelName }) => {
        router.push(`/meet/room?id=${channelName}`);
      },
      onError(error) {
        console.log(error.message);
      },
    },
  );

  const isLoading = createLoading || status === "loading";

  const handleCreateClick = () => {
    mutate();
  };

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const handleCancelClick = useCallback(() => {
    setShowModal(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Modal
        show={showModal}
        onClose={() => {
          console.log("G");
        }}
      >
        <JoinForm onCancel={handleCancelClick} />
      </Modal>
      <Box className="grid gap-10 p-10 phone:grid-cols-1 phone:grid-rows-2 desktop:grid-cols-2 desktop:grid-rows-1">
        <Button
          onClick={handleCreateClick}
          disabled={status === "unauthenticated"}
        >
          <span className="flex items-center justify-center space-x-2">
            <MatchIcon width={60} height={50} />
            Create
          </span>
        </Button>
        <Button onClick={handleJoinClick}>
          <span className="flex items-center justify-center space-x-2">
            <CampFireIcon width={60} height={50} />
            Join
          </span>
        </Button>
      </Box>
    </main>
  );
};

export default LobbyPage;
