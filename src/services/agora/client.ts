// create ky client to Agora RESTApi

import { env } from "@/env";
import ky from "ky";

const BASE_URL = "http://api.agora.io/dev/v1/";

// generate AuthorizationHeader
const { AGORA_KEY, AGORA_SECRET } = env;
const credential = `${AGORA_KEY}:${AGORA_SECRET}`; // key:value
const AuthorizationHeader = `Basic ${btoa(credential)}`; // convert crredential to base-64

const AgoraApiClient = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    "content-type": "application/json",
    Authorization: AuthorizationHeader,
  },
});

export default AgoraApiClient;
