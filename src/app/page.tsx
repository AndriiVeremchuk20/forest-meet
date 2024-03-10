
import { Box, NextImage } from "@/components/common";
import {StartLinks} from "@/components/start-links";

const Home = () => {
  return (
    <main className="phone:pt-[160px] laptop:pt-[120px]">
      <div className="overflow-x-hidden flex flex-col items-center justify-center laptop:space-y-[500px] tablet:space-y-[400px] phone:space-y-[300px]">
        {/*Welcome text*/}	
		<div className="h-4/5 flex items-start flex-col" data-aos="fade-right">
          <h1 className="animate-fade animate-once phone:text-3xl tablet:text-6xl desktop:text-8xl">
            Welcome to Forest Meet
          </h1>
          <Box className="flex tablet:flex-row laptop:flex-row phone:flex-col">
            <NextImage
              src="/img/light_ex.png"
              alt="example_1"
              className="h-fit phone:w-full tablet:w-[300px]"
            />
            <div className="p-1 text-balance text-justify">
              Forest Meet is an online meeting platform that offers a
              distinctive experience, seamlessly blending cutting-edge
              technologies with the cozy ambiance of friendly gatherings around
              a virtual campfire set amidst the serene surroundings of a virtual
              forest.
            </div>
          </Box>
        </div>


       {/*Why Forest meet*/}
        <div data-aos="fade-left" className="h-fit flex flex-col items-end">
          <h1 className="animate-fade animate-once phone:text-3xl tablet:text-6xl desktop:text-8xl">
            Why Forest Meet?
          </h1>

          <Box className="flex tablet:flex-row laptop:flex-row phone:flex-col">
            <NextImage
              src="/img/dark_ex.png"
              alt="example_1"
              className="h-fit phone:w-full tablet:w-[300px]"
            />
            <div className="p-1 text-balance text-justify"> 
           In a world where digital connections often lack depth and warmth, Forest Meet beckons like a beacon of genuine camaraderie. Picture yourself beneath the virtual canopy, the soft glow of the campfire illuminating faces from all corners of the globe.
            </div>
          </Box>
        </div>

        <div className="">
          <StartLinks />
          <div data-aos="fade-up">
            <NextImage src="/img/fire.gif" alt="fire-gif" />
          </div>
        </div>
      </div>
    </main>
  );
};


export default Home;
