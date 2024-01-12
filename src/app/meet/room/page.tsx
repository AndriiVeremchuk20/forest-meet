
"use client"


import Meet from "@/components/meet";
import { useSearchParams } from "next/navigation";


// getting a room id from  search params like: (/room?id=someId&token=tokeeeeen)
const RoomPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");
 

  return (
    <main>
     { roomId && token && uid &&
	  	<Meet roomId={roomId} token={token} uid={Number(uid)}/>    
    }
	</main>
  );
};

export default RoomPage;

