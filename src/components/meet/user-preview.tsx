import { useUserMedia } from "@/hooks";
import { useMediaControlStore } from "@/store";
import Image from "next/image";
import { useEffect } from "react";

const UserPreview = () => {
  const { enabledCamera, enabledMicro } = useMediaControlStore();
  const { isLoading, media } = useUserMedia({
    video: !enabledCamera,
    audio: !enabledMicro,
  });

  useEffect(() => {
    if(enabledCamera){
      media?.getTracks().forEach((track) => track.stop());
	}

	return () => {
      media?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line
  }, [media,enabledCamera, enabledMicro]);

  if (media) {
    return (
      <div className="border-orange-900 bg-neutral-400">
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
            className="h-[300px] w-[300px]"
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

export default UserPreview
