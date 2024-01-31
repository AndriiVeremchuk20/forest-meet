import { Box } from "@/components/common";
import { CoffeIcon } from "@/components/icons";
import Link from "next/link";

const DonatePage = () => {
  const BMCLink = "https://www.buymeacoffee.com/andriiveremchuk";

  return (
    <main className="flex max-h-fit min-h-screen w-full items-center justify-center">
      <Box className="flex h-fit flex-col items-center justify-center gap-5 p-10">
        <span className="border-b-4 border-black text-5xl dark:border-white">
          Support Forest Meet
        </span>
        <Link
          href={BMCLink}
          className="flex animate-bounce items-center justify-center bg-orange-800 duration-150 animate-duration-[3000ms] animate-infinite hover:bg-orange-900 active:bg-orange-900"
        >
          <CoffeIcon
            width={10}
            className="h-[80px] w-[80px] bg-orange-400 p-2"
          />
          <span className="px-5 text-5xl">Donate</span>
        </Link>
      </Box>
    </main>
  );
};

export default DonatePage;
