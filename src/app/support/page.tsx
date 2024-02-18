//import { cookies } from "next/headers";

import { Box, NextImage } from "@/components/common";
import { CoffeeIcon, DeerFrameIcon } from "@/components/svgs";
import { api } from "@/trpc/server";
import { cookies } from "next/headers";
import Link from "next/link";

async function getCookieData() {
  const cookieData = cookies().getAll();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000),
  );
}

const BMCLink = "https://www.buymeacoffee.com/andriiveremchuk";

const DonatePage = async () => {
  await getCookieData();
  const supporters = await api.donate.getSupportesr.query();

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-5 pb-10">
      <Box className="mt-[170px] flex h-fit flex-col items-center justify-center gap-5 p-10">
        <span className="border-b-4 border-black text-5xl dark:border-white">
          Support Forest Meet
        </span>
        <Link
          href={BMCLink}
          className="flex animate-bounce items-center justify-center bg-orange-800 duration-150 animate-duration-[3000ms] animate-infinite hover:bg-orange-900 active:bg-orange-900"
        >
          <CoffeeIcon
            width={10}
            className="h-[80px] w-[80px] bg-orange-400 p-2"
          />
          <span className="px-5 text-5xl">Support</span>
        </Link>
      </Box>
      <Box className="flex h-auto flex-col items-center justify-center p-5">
        <span className="w-fit border-b-4 border-black text-center text-5xl dark:border-white">
          Our Supporters
        </span>
        <div className="grid grid-flow-row-dense gap-5 p-5 phone:grid-cols-2 laptop:grid-cols-4">
          {supporters.map(({ id, name, message }) => (
            <div key={id}>
              <div title={message ?? ""} className="relative w-[200px]">
                <UserInFrame avatar={"/user.png"} />
                <span className="text-center text-2xl">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </main>
  );
};

const UserInFrame = ({ avatar }: { avatar: string }) => {
  return (
    <div className="felx block items-center justify-center phone:w-[150px] laptop:w-[200px]">
      <DeerFrameIcon width={150} height={100} />
      <NextImage
        src={avatar}
        className="absolute left-[45px] top-[40px] -z-10 w-[60px] backdrop-blur-md"
      />
    </div>
  );
};

export default DonatePage;
