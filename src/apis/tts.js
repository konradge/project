import axios from "axios";

export default axios.create({
  baseURL: "https://viomatic-com-text-to-speech-tts-v1.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "viomatic-com-text-to-speech-tts-v1.p.rapidapi.com",
    "x-rapidapi-key": "7e09f126a9mshe17e0f58a89bc9dp100338jsn823f7c4529db",
    "content-type": "application/x-www-form-urlencoded"
  }
});
