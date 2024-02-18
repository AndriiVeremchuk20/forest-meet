import { NextLink, Box } from "@/components/common";
import { CoffeeIcon, MonkeyIcon } from "@/components/svgs";
import Routes from "@/config/routes";

const MeetEndedPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Box className="mt-[80px] grid animate-fade grid-cols-1 grid-rows-2 gap-5 p-10">
        <h1 className="text-center text-6xl">Meet Ended</h1>
        <div className="grid gap-4 phone:grid-cols-1 phone:grid-rows-2 desktop:grid-cols-2 desktop:grid-rows-1">
          <NextLink href={"/"} type="button">
            Home
          </NextLink>
          <NextLink href={"/meet"} type="button">
            Lobby
          </NextLink>
        </div>
        <div className="flex flex-col justify-center space-y-3">
          <span className=" text-justify tablet:text-2xl laptop:text-3xl">
            We hope you enjoyed the meeting! If you have any further questions
            or would like to share your feedback, please don&apos;t hesitate to
            contact us. You can also support our project. Thank you for your
            attention and interest in our work!
          </span>
          <div className="flex items-center justify-center space-x-5">
            <NextLink href={Routes.information}>
              Contact <MonkeyIcon width={40} height={40} />
            </NextLink>
            <NextLink href={Routes.support}>
              Support <CoffeeIcon width={40} height={40} />
            </NextLink>
          </div>
        </div>
      </Box>
    </main>
  );
};

export default MeetEndedPage;
