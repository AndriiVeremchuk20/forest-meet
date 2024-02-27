import { NextLink, Box, NextImage } from "@/components/common";
import { LogoIcon } from "@/components/svgs";
import Routes from "@/config/routes";
import { getServerAuthSession } from "@/server/auth";

// add meet screenshot to home page

const Home = () => {
  return (
    <main className="flex w-full flex-col items-center justify-center pt-[120px]">
      <h1 className="animate-fade animate-once phone:text-2xl tablet:text-5xl desktop:text-8xl">
        What is Forest Meet?
      </h1>
      <Box className="flex w-full flex-col items-center gap-10 phone:p-3 desktop:p-10">
        <IntroText />
        <div className="flex w-full items-center justify-around">
          <NextImage
            src="/dark_1.png"
            className="animate-fade-right animate-once phone:w-[180px] tablet:w-[200px] laptop:w-[300px]"
          />
          <NextImage
            src="/light_1.png"
            className="animate-fade-left animate-once phone:w-[180px] tablet:w-[200px] laptop:w-[300px]"
          />
        </div>
        <Links />
      </Box>
    </main>
  );
};

const IntroText = () => {
  return (
    <div className="flex gap-4 phone:flex-col desktop:flex-row">
      <span className="text-justify text-2xl">
        Forest Meet is an online meeting platform that offers a distinctive
        experience, seamlessly blending cutting-edge technologies with the cozy
        ambiance of friendly gatherings around a virtual campfire set amidst the
        serene surroundings of a virtual forest.
      </span>
    </div>
  );
};

const Links = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="laptot:flex-row flex space-y-2 phone:flex-col">
      <NextLink href={Routes.meetBase} type="button">
        Go To Forest Meet <LogoIcon />
      </NextLink>
      {!session?.user && (
        <NextLink href={"/auth/"} type="button">
          Sign in / Sign up
        </NextLink>
      )}
    </div>
  );
};

export default Home;
