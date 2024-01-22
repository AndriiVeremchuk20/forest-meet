import { useUserMedia } from "@/hooks/user-media";
import Image from "next/image";

export const UserPreview = () => {
  const { isLoading, media } = useUserMedia({ video: true, audio: true });
  
  if (media) {
    return (
      <div className="bg-neutral-400 border-orange-900">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <video
            ref={(ref) => {
              if (ref && media) {
                ref.srcObject = media;
              }
            }}
            autoPlay
            playsInline
            muted
			className="w-[300px] h-[300px]"
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="h-full w-full bg-neutral-400">
        <Image src={"/user.png"} width={200} height={200} alt="user" />
      </div>
    );
  }
};
