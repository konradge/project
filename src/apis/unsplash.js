import Axios from "axios";

export default Axios.create({
  baseURL: "https://api.unsplash.com/search/photos",
  headers: {
    Authorization: "Client-ID " + process.env.REACT_APP_UNSPLASH_TOKEN
  }
});
