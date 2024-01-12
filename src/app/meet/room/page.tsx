"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
//import Meet from "@/components/meet";

const Meet =  dynamic(()=>import("../../../components/meet"), {ssr: false})


// getting a room id from  search params like: (/room?id=someId&token=tokeeeeen)
const RoomPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  return (
    <main>
      {roomId && token && uid && (
        <Meet roomId={roomId} token={token} uid={Number(uid)} />
      )}
    </main>
  );
};

export default RoomPage;
