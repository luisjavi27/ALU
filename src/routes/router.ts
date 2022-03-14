import { Router } from "express";
import {getCuenta, postLogin, getMovimientos, postUser, putRetiro, putAbono} from "../controllers/controller"
import checkAuth from "../middleware/auth";

const router = Router();




const rutas = (app) => {
    const router = Router();
    app.use('/', router);

    router.get(`/getcuenta/:id`, getCuenta);// obtiene la cuenta segun usuario
    router.post(`/postlogin`, postLogin); // obtiene el usuario
    router.get(`/getmovimientos/:id`, getMovimientos); // obtiene todos los movimientos segun idUser

    router.post(`/postUser`, postUser);

    router.put(`/putretiro/`, putRetiro); // recibe el id del usuario y el monto a retirar
    router.put(`/putabono/`, putAbono);// recibe el id del usuario y el monto a abonar
    // router.put(`/putabono/`,checkAuth, putAbono);// recibe el id del usuario y el monto a abonar
 
}



export default rutas;
