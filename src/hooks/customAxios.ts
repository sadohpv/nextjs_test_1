import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Access-Control-Allow-Origin": "*",
    withCredentials: true, // false nếu muốn chặn server set cookies
  },
});

instance.interceptors.response.use(
  (response: any) => {
    //response.headers("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // console.log("Here");
    return response.data ? response.data : response.status;
  },
  (error: any) => {
    let res: { data: any; status: any; headers: any; code: any } = {
      data: undefined,
      status: undefined,
      headers: undefined,
      code: undefined,
    };
    if (error.response) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      return (res.code = 400);
    } else {
      console.log("Error: " + error.message);
    }

    return res;
    //return Promise.reject(error);
  }
);

export default instance;
