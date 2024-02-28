import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center ">
        <Image src="/img/fire.gif" alt="loader" width={500} height={400} priority />
        <span className="text-4xl font-bold text-white">Loading..</span>
      </div>
    </div>
  );
};

export default Loader;
