import { NextLink, Box } from "@/components/common";

const MeetEndedPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Box className="p-10 grid grid-rows-2 grid-cols-1 animate-fade">
        <h1 className="text-center text-6xl">Meet Ended</h1>
        <div className="grid desktop:grid-cols-2 desktop:grid-rows-1 phone:grid-cols-1 phone:grid-rows-2 gap-4">
          <NextLink href={"/"} type="button">
            Home
          </NextLink>
          <NextLink href={"/meet"} type="button">
            Lobby
          </NextLink>
        </div>
      </Box>
    </main>
  );
};

export default MeetEndedPage;
