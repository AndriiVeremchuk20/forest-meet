import { GoogleButton, SingOutButton } from "@/components/button/auth";
import {getServerAuthSession} from "@/server/auth";
import Link from "next/link";

const AuthPage = async() => {
  const sesion = await getServerAuthSession();

  return (
    <main className="flex h-screen items-center justify-center">
      {!sesion?.user ? <SignInForm /> : <SuccessMessage />}
    </main>
  );
};

const SignInForm = () => {
  return (
    <form className="flex h-[300px] w-[400px] flex-col items-center justify-between border-[5px] border-green-500 p-4 backdrop-blur-md dark:border-blue-900">
      <h2 className="border-b-[3px] border-green-500 text-center text-4xl dark:border-blue-900">
        Sing In
      </h2>
      <div className="text-2xl">
        Authorization with password and email will be available soon
      </div>
      <div className="">
        <GoogleButton />
      </div>
    </form>
  );
};

const SuccessMessage = () => {
  return (
    <div className="flex h-[300px] w-[400px] flex-col items-center justify-between border-[5px] border-green-500 p-4 backdrop-blur-md dark:border-blue-900">
      <h2 className="border-b-[3px] border-green-500 text-center text-4xl dark:border-blue-900">
        Success
      </h2>
      <span className="text-xl">
        You have signed in successfully. Start using Forest Meet now. Go to{" "}
        <Link className="text-blue-500 underline hover:text-blue-700" href="/">
          Home
        </Link>
      </span>

      <div className="grid grid-cols-2 gap-2">
        <span>If you wish to sign out, please click the button below.</span>
        <SingOutButton />
      </div>
    </div>
  );
};

export default AuthPage;
