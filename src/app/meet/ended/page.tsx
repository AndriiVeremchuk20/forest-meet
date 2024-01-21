import Link from "next/link";

const MeetEndedPage = () => {
  return (
    <div>
      Meet Ended
      <div>
        <Link href={"/"}>Home</Link>
        <Link href={"/meet"}>Lobby</Link>
      </div>
    </div>
  );
};

export default MeetEndedPage;
