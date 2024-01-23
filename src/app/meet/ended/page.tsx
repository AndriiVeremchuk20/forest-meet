import { NextLink } from "@/components/default";

const MeetEndedPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="grid grid-rows-2 gap-4 border-[5px] border-green-400 p-5 backdrop-blur-xl dark:border-blue-900">
        <h1 className="text-6xl">Meet Ended</h1>
        <div className="grid grid-cols-2 gap-2">
          <NextLink href={"/"} type="button">
            Home
          </NextLink>
          <NextLink href={"/meet"} type="button">
            Lobby
          </NextLink>
        </div>
      </div>
    </main>
  );
};

export default MeetEndedPage;
