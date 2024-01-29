"use client";

//import RemoteUsersCircle from "@/components/meet/remote-users-circle";
import MeetControl from "@/components/meet/control";
import dynamic from "next/dynamic";

const UsersAroundFire = dynamic(
  () => import("../../components/meet/users-around-fire"),
  { ssr: false },
);

const TestPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/*  <UsersAroundFire /> */}
      <div className="absolute bottom-0 w-full">
        <MeetControl
          onLeaveClick={() => {
            console.log("mem");
          }}
        />
      </div>
    </div>
  );
};

export default TestPage;
