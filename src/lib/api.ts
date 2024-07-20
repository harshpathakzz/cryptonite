import axios from "@/lib/axios";

export const searchCoin = async (query: string) => {
  const response = await axios.get(`/search?query=${query}`);
  return response.data;
};

export const exploreCoins = async (pageNumber: number) => {
  const response = await axios.get(`/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: pageNumber,
      sparkline: false,
      price_change_percentage: "1h,24h,7d,14d,30d,200d,1y",
      locale: "en",
      precision: 2,
    },
  });
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

export const getWatchListCoins = async (ids: string[]) => {
  const response = await axios.get(`/coins/markets`, {
    params: {
      vs_currency: "usd",
      ids: ids.join(","),
      order: "market_cap_desc",
      per_page: 250,
      page: 1,
      sparkline: false,
      price_change_percentage: "1h,24h,7d,14d,30d,200d,1y",
      locale: "en",
      precision: 2,
    },
  });
  return response.data;
};

export const getTrendingCoins = async () => {
  const response = await axios.get(`/search/trending`);
  return response.data.coins;
};

export const getPublicCompaniesHoldings = async (query: string) => {
  const response = await axios.get(`/companies/public_treasury/${query}`);
  return response.data;
};
