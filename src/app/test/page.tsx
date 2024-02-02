"use client";

//import RemoteUsersCircle from "@/components/meet/remote-users-circle";
import dynamic from "next/dynamic";

const TestUsersAroundFire = dynamic(
  () => import("../../components/test-component/test-user-around-fire"),
  { ssr: false },
);

const TestPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center"></div>
  );
};

export default TestPage;
