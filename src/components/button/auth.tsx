import { signIn, signOut } from "next-auth/react";
import { GoogleIcon } from "../icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    const res = await signIn("google", { redirect: false });
    setIsLoading(false);

    if (res?.error) {
      alert(res.error);
    }

    if (res?.url) {
      router.push(res.url);
    }
  };

  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={handleClick}
      className="flex w-[300px]  items-center border-[5px] border-blue-800 bg-blue-500 duration-100 hover:bg-indigo-500 focus:border-blue-600 focus:bg-indigo-600"
    >
      <div className="bg-blue-300 p-1">
        <GoogleIcon width={45} />
      </div>
      <span className="p-2 text-2xl text-white">
        {isLoading ? "Loading" : "Sign in with Google"}
      </span>
    </button>
  );
};

export const SingOutButton = () => {
  const handleClick = async () => {
    const res = await signOut();
    console.log(res);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="border-[5px] border-red-700 bg-red-500 p-2 text-white transition duration-300 hover:bg-red-600 focus:bg-red-700"
    >
      Sign Out
    </button>
  );
};
