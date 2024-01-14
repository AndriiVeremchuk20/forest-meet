import Link from "next/link";

const MeetEndedPage = () => {
  return (
    <div>
      Meet Ended
      <div>
        <Link href={"/"}>Home</Link>
        <Link href={"/meet/lobby"}>Lobby</Link>
      </div>
    </div>
  );
};

export default MeetEndedPage;
