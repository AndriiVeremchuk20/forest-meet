import { env } from "@/env";
import ky from "ky";

//const BASE_URL = "https://developers.buymeacoffee.com/api";

const AccessToken = env.BUY_ME_A_COFFE_TOKEN;

const BMCclient = ky.create({
  headers: {
    Authorization: `Bearer ${AccessToken}`,
  },
});

const getByUrl = async <T>(url: string) => {
  try {
    const response = await BMCclient.get(url).json<T>();
    return response;
  } catch (error) {
    console.log("Request error");
    console.log(error);
  }
};

const getAllSupporters = async () => {
  const path = "https://developers.buymeacoffee.com/api/v1/supporters";
  let data: SupportEntry[] = [];

  try {
    const response = await BMCclient.get(path).json<SupportData>();
    let next_page_url = response.next_page_url;
    data = data.concat(response.data);

    while (next_page_url) {
      const subResponse = await getByUrl<SupportData>(next_page_url);
      if (!subResponse) break;
      next_page_url = subResponse.next_page_url;
      data = data.concat(subResponse.data);
    }
  } catch (error) {
    console.log("Error getting supporters");
    console.log(error);
  } finally {
    return data;
  }
};

const BMC = {
  getAllSupporters,
};

export default BMC;

interface SupportData {
  current_page: number;
  data: SupportEntry[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface SupportEntry {
  support_id: number;
  support_note: string | null;
  support_coffees: number;
  transaction_id: string;
  support_visibility: number;
  support_created_on: string;
  support_updated_on: string;
  transfer_id: string | null;
  supporter_name: string | null;
  support_coffee_price: string;
  support_email: string | null;
  is_refunded: boolean | null;
  support_currency: string;
  support_note_pinned: number;
  referer: string | null;
  country: string | null;
  payer_email: string;
  payment_platform: string;
  payer_name: string;
}
