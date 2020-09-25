import axios from "axios";

const axiosAutorizado = () => {

  try {
    const token = window.sessionStorage.getItem('token')
    return axios.create({
      baseURL: "",
      headers: {
        authorization: token
      }
    })

  } catch (err) {
    console.log(err)
  }




}

export default axiosAutorizado;