import { NextLink, Box } from "@/components/common";
import {getServerAuthSession} from "@/server/auth";

const Home = async() => {
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

const Links = async() => {
  const session = await getServerAuthSession();
  return (
    <div className="">
      {session?.user ? (
        <NextLink href="/meet/" type="button">
          Go To Forest Meet
        </NextLink>
      ) : (
        <div className="flex space-x-3">
          <NextLink href={"/meet/"} type="button">
            Join
          </NextLink>

          <NextLink href={"/auth/"} type="button">
            Sign in
          </NextLink>
        </div>
      )}
    </div>
  );
};

export default Home;
