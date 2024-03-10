import {getServerAuthSession} from "@/server/auth";
import {NextLink} from "./common";
import Routes from "@/config/routes";
import {LogoIcon} from "./svgs";

export const StartLinks = async () => {
  const session = await getServerAuthSession();
  return (
    <div
      data-aos="fade-left"
      className="laptot:flex-row flex space-y-2 phone:flex-col"
    >
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

