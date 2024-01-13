import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen backdrop-blur-sm items-center justify-center">
      <div className="flex flex-col items-center ">
        <Image
          src="/loader.gif"
          alt="loader"
          width={500}
          height={400}
          priority
        />
        <span className="text-4xl text-white font-bold">Loading..</span>
      </div>
    </div>
  );
};

export default Loader;
