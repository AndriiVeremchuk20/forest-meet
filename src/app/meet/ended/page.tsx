import { NextLink, Box } from "@/components/common";

const MeetEndedPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Box className="grid grid-rows-2 gap-4">
        <h1 className="text-center text-6xl">Meet Ended</h1>
        <div className="grid grid-cols-2 gap-5">
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
