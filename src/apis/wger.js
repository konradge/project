import axios from "axios";

export default axios.create({
  baseURL: "https://wger.de/api/v2/"
});
