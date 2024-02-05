"use client";

import { Box, Modal } from "@/components/common";
//import RemoteUsersCircle from "@/components/meet/remote-users-circle";
//import dynamic from "next/dynamic";
import ExitIcon from "@/components/svgs/exit.svg";
import { useState } from "react";

const TestPage = () => {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => setShowModal(false);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Modal show={showModal} onClose={onCloseModal}>
        <Box className="p-10">GGGGGG</Box>
      </Modal>

      <div onClick={() => setShowModal(true)}>Show Modal</div>
    </div>
  );
};

export default TestPage;
