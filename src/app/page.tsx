import { NextLink, Box } from "@/components/common";
import { LogoIcon } from "@/components/svgs";
import Routes from "@/config/routes";
import { getServerAuthSession } from "@/server/auth";

// add meet screenshot to home page

const Home = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="animate-fade animate-once phone:text-3xl tablet:text-5xl desktop:text-8xl">
        What is Forest Meet?
      </h1>
      <Box className="flex flex-col items-center gap-10 phone:p-3 desktop:p-10">
        <IntroText />
        <Links />
      </Box>
    </main>
  );
};

const IntroText = () => {
  return (
    <div className="flex gap-4 phone:flex-col desktop:flex-row">
      <span className="text-justify text-2xl">
        Forest Meet is an online meeting platform that offers a unique
        experience, merging cutting-edge technologies with the warm atmosphere
        of friendly gatherings around a virtual campfire.
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
