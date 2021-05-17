import axios from "axios";
import { API_KEY } from "../constants";

export const newsService = async (url) => {
  let newsURL = `https://newsapi.org/v2/everything?q=Apple&from=2021-05-15&sortBy=popularity&apiKey=${API_KEY}`;
  return await (await axios.get(newsURL)).data;
};
