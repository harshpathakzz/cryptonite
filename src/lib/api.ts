import axios from "@/lib/axios";

export const searchCoin = async (query: string) => {
  const response = await axios.get(`/search?query=${query}`);
  return response.data;
};
