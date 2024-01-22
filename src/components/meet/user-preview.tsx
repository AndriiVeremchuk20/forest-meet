import { useUserMedia } from "@/hooks/user-media";
import Image from "next/image";
import { useEffect } from "react";

export const UserPreview = () => {
  const { isLoading, media } = useUserMedia({ video: true, audio: false });

  useEffect(() => {
    return () => {
      media?.getTracks().forEach((track) => track.stop());
    };
  }, []);

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
