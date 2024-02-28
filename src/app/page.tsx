import { Slider } from "@/components/slider";
import { NextLink, Box } from "@/components/common";
import { LogoIcon } from "@/components/svgs";
import Routes from "@/config/routes";
import { getServerAuthSession } from "@/server/auth";

const Home = () => {
  return (
    <main className="h-screen phone:pt-[160px] laptop:pt-[120px]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="animate-fade animate-once phone:text-3xl tablet:text-5xl desktop:text-8xl">
          Welcome to Forest Meet
        </h1>
        <Box className="flex items-center justify-center phone:flex-col laptop:flex-row">
          <div className="h-full w-full border-green-500 bg-red-500 dark:border-blue-900 phone:border-b-[5px] laptop:border-r-[5px]">
            <Slider
              images={["/img/dark_ex.png", "/img/light_ex.png"]}
              delay={5000}
            />
          </div>
          <div className="flex flex-col items-center gap-10 phone:p-3 desktop:p-10">
            <IntroText />
            <Links />
          </div>
        </Box>
      </div>
    </main>
  );
};

const IntroText = () => {
  return (
    <div className="flex phone:flex-col desktop:flex-row">
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
