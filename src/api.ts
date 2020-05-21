import axios from "axios";

const api = axios.create({
  baseURL: "https://tcc-backend-turismo.herokuapp.com/",
});
//"https://tcc-backend-turismo.herokuapp.com/"
//"http://127.0.0.1:3333/"
export default api;
