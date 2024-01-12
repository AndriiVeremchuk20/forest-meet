import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center rounded-lg bg-neutral-200 shadow-xl">
        <Image
          src="/loader.gif"
          alt="loader"
          width={500}
          height={400}
          priority
        />
        <span className="text-2xl text-black">Loading..</span>
      </div>
    </div>
  );
};

export default Loader;
