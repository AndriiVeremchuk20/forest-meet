const BadConnection = () => {
  return (
  <main className="w-full h-screen flex justify-center items-center">
    <div className="flex justify-center items-center h-3/4 w-3/4 animate-pulse border-[5px] border-green-400 bg-neutral-200 dark:border-blue-900 dark:bg-indigo-800">
      <div className="text-black dark:text-white phone:text-4xl desktop:text-6xl">
        Bad connection
      </div>
    </div>
	</main>
  );
};

export default BadConnection;
