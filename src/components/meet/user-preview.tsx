import { useUserMedia } from "@/hooks";
import { useMediaControlStore } from "@/store";
import { memo, useEffect, useRef } from "react";

const UserPreview = () => {
  const { enabledCamera, enabledMicro } = useMediaControlStore();

  const audioRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { isLoading, media } = useUserMedia({
    video: enabledCamera,
    audio: enabledMicro,
  });

  useEffect(() => {
    if (media && videoRef.current) {
      videoRef.current.srcObject = media;
    }

    if (media && audioRef.current) {
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(media);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      const draw = () => {
        if (!audioRef.current) {
          return;
        }
        const ctx = audioRef.current.getContext("2d")!;
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "rgba(0, 0, 0,0)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const barWidth = (ctx.canvas.width / bufferLength) * 2.5;
        let x = 0;
        dataArray.forEach((value) => {
          const barHeight = value / 2;
          ctx.fillStyle = "rgb(" + barHeight + ",47,230)";
          ctx.fillRect(x, ctx.canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        });
        requestAnimationFrame(draw);
      };

      draw();
    }

    if (!enabledCamera) {
      media?.getVideoTracks().forEach((track) => track.stop());
    }

    if (!enabledMicro) {
      media?.getAudioTracks().forEach((track) => track.stop());
    }

    return () => {
      media?.getTracks().forEach((track) => track.stop());
    };
    //eslint-disable-next-line
  }, [media, enabledCamera, enabledMicro]);

  if (isLoading) {
    return (
      <span className="animate-jump text-3xl animate-delay-1000 animate-duration-1000 animate-infinite">
        Loading
      </span>
    );
  }

  return (
    <div>
      {enabledMicro && (
        <canvas
          ref={audioRef}
          width={400}
          height={50}
          className="h-fit w-full"
        />
      )}
      <video
        ref={videoRef}
        poster="/img/user.png"
        autoPlay
        playsInline
        muted
        className="h-fit w-fit backdrop-blur-xl"
      />
    </div>
  );
};

const UserPreviewWraper = () => {
  return (
    <div className="flex items-center justify-center  phone:w-screen tablet:w-[600px] laptop:w-[600px]">
      <UserPreview />
    </div>
  );
};

export default memo(UserPreviewWraper);
