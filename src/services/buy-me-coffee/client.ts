// create Buy me a coffe API client

import { env } from "@/env";
import ky from "ky";

const AccessToken = env.BUY_ME_A_COFFE_TOKEN;

const BMCclient = ky.create({
  headers: {
    Authorization: `Bearer ${AccessToken}`,
  },
});

export default BMCclient;
