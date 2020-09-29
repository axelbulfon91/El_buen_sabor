import { toast } from 'react-toastify'

const generarNotificacion = (tipo, mensaje) => {
    if (tipo === "exito") {
        toast.success(mensaje, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else {
        toast.error(mensaje, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export default generarNotificacion;