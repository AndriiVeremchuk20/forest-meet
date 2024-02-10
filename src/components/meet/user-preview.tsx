import { useUserMedia } from "@/hooks";
import { useMediaControlStore } from "@/store";
import Image from "next/image";
import { memo, useEffect } from "react";

const UserPreview = () => {
  const { enabledMicro, enabledCamera } = useMediaControlStore();
  const { isLoading, media } = useUserMedia({
    video: !enabledCamera,
    audio: !enabledMicro,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (enabledCamera) {
      media?.getTracks().forEach((track) => track.stop());
    }

    return () => {
      media?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line
  }, [media, enabledCamera, enabledMicro]);

  if (media) {
    return (
      <div className="border-[5px] border-orange-900 bg-neutral-400">
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
            className="h-[300px] w-[400px]"
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="h-full w-full bg-neutral-400">
        <Image src={"/user.png"} width={400} height={300} alt="user" />
      </div>
    );
  }
};

export default memo(UserPreview);
