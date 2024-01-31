const BadConnection = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="flex h-3/4 w-3/4 animate-pulse items-center justify-center border-[5px] border-green-400 bg-neutral-200 dark:border-blue-900 dark:bg-indigo-800">
        <div className="text-black dark:text-white phone:text-4xl desktop:text-6xl">
          Bad connection
        </div>
      </div>
    </main>
  );
};

export default BadConnection;
