import axios from "@/lib/axios";

export const searchCoin = async (query: string) => {
  const response = await axios.get(`/search?query=${query}`);
  return response.data;
};

export const exploreCoins = async (pageNumber: number) => {
  const response = await axios.get(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${pageNumber}&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y%20&locale=en&precision=2`
  );
  return response.data;
};

export const getCoin = async (id: string) => {
  const response = await axios.get(`/coins/${id}`);
  return response.data;
};

export const getCoinMarketChart = async (id: string, days: number) => {
  const response = await axios.get(
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
  return response.data;
};
