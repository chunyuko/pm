// let baseURL = process.env.NODE_ENV !== "production" ? "" : "http://localhost:8080";
// let timeout = process.env.NODE_ENV !== "production" ? 3000 : 1000;
// let baseURL = "http://localhost:8080";
// let baseURL = "/";
// let baseURL = "http://192.168.10.118:6200";
// let baseURL = process.env.NODE_ENV == "production" ? process.env.VUE_APP_BASEURL : "/";
// let baseURL = process.env.VUE_APP_MODE && process.env.VUE_APP_MODE != "false" ? "/" + process.env.VUE_APP_MODE : "/";
let baseURL = process.env.NODE_ENV == "production" ? "/" : "/" + process.env.VUE_APP_MODE;
// let timeout = 5000;
let timeout = 0;

export default { baseURL, timeout };
