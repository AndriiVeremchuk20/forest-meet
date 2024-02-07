import BMCclient from "./client";
import type { SupportData, SupportEntry } from "./types";

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

const buyMeCoffeeAPI = {
  getAllSupporters,
};

export default buyMeCoffeeAPI;
