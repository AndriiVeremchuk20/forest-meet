"use client";

import BadConnection from "@/components/meet/bad-connection";
//import RemoteUsersCircle from "@/components/meet/remote-users-circle";
import MeetControl from "@/components/meet/control";
import dynamic from "next/dynamic";

const TestUsersAroundFire = dynamic(
  () => import("../../components/test-component/test-user-around-fire"),
  { ssr: false },
);

const TestPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <BadConnection />
    </div>
  );
};

export default TestPage;
