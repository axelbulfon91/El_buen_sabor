import axios from "axios";

const axiosAutorizado = () => {

    const token = sessionStorage.getItem('token')
    return axios.create({
        baseURL: "",
        headers: {
            authorization: token
        }
    })
}

export default axiosAutorizado;