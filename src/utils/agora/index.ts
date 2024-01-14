import generateChannelName from "./channel-name-generator";
import { generateRtcToken } from "./generate-rtc-token";
import { generateUid } from "./generate-uid";

const AgoraServices = {
  generateUid,
  generateRtcToken,
  generateChannelName,
};

export default AgoraServices;
