"use client";
import { signIn } from "next-auth/react";

const AuthPage = () => {
  const onSingInClick = async () => {
    const auth = await signIn("google", { redirect: false });
    console.log(auth);
  };

  return (
    <main>
      <div>
        <button onClick={onSingInClick}>Sing in</button>
      </div>
    </main>
  );
};

export default AuthPage;
