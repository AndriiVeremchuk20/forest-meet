import { type RtmChannel } from "agora-rtm-react";
import { type FC } from "react";

interface ChatProps {
  rtmChannel: RtmChannel;
}

const Chat: FC<ChatProps> = ({ rtmChannel }) => {
  return <div className="h-screen w-2/6 bg-red-600"></div>;
};

export default Chat;
