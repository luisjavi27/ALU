"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const router = (0, express_1.Router)();
const rutas = (app) => {
    const router = (0, express_1.Router)();
    app.use('/', router);
    router.get(`/getcuenta`, controller_1.getCuenta); // obtiene la cuenta segun usuario
    router.get(`/getuser`, controller_1.getUser); // obtiene el usuario
    router.get(`/getmovimientos/:id`, controller_1.getMovimientos); // obtiene todos los movimientos segun idUser
    router.post(`/postUser`, controller_1.postUser);
    router.put(`/putretiro/`, controller_1.putRetiro); // recibe el id del usuario y el monto a retirar
    router.put(`/putabono/`, controller_1.putAbono); // recibe el id del usuario y el monto a abonar
};
exports.default = rutas;
//# sourceMappingURL=router.js.map