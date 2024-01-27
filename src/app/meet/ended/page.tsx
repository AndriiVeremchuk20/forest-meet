import { NextLink, Box } from "@/components/common";

const MeetEndedPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Box className="grid animate-fade grid-cols-1 grid-rows-2 p-10">
        <h1 className="text-center text-6xl">Meet Ended</h1>
        <div className="grid gap-4 phone:grid-cols-1 phone:grid-rows-2 desktop:grid-cols-2 desktop:grid-rows-1">
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
