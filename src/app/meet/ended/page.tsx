import {NextLink} from "@/components/default";

const MeetEndedPage = () => {
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className="grid grid-rows-2 gap-4 p-5 border-[5px] border-green-400 dark:border-blue-900 backdrop-blur-xl">
        <h1 className="text-6xl">Meet Ended</h1>
        <div className="grid grid-cols-2 gap-2">
          <NextLink href={"/"} type="button">Home</NextLink>
          <NextLink href={"/meet"} type="button">Lobby</NextLink>
        </div>
      </div>
    </main>
  );
};

export default MeetEndedPage;
