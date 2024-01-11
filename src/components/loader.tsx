import Image from "next/image";

const Loader = () => {

return <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">	
	<div className="flex flex-col items-center bg-neutral-200 rounded-lg shadow-xl">
	<Image src="/loader.gif" alt="loader" width={500} height={400}/>
	<span className="text-2xl text-black">Loading..</span>
	</div>
</div>
}

export default Loader;
