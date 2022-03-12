"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putAbono = exports.putRetiro = exports.postUser = exports.getMovimientos = exports.getUser = exports.getCuenta = void 0;
const mysql_service_1 = __importDefault(require("../services/mysql.service"));
const handleBcrypt_1 = require("../services/handleBcrypt");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, contraseña } = req.body;
        const response = yield (0, mysql_service_1.default)(`SELECT idusuario, correo, contraseña FROM usuarios WHERE correo = '${correo}'`);
        const checkContraseña = yield (0, handleBcrypt_1.compare)(contraseña.toString(), response[0].contraseña);
        if (checkContraseña) {
            const userData = {
                "idUser: ": response[0].idusuario,
                correo,
                "contraseña": "validated"
            };
            const data = {
                message: `${response.length} datos encontrados`,
                datos: userData
            };
            res.json(data);
        }
        else {
            res.json({ error: "password" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.getUser = getUser;
const getCuenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const response = yield (0, mysql_service_1.default)(`SELECT idcuenta, correo, saldo FROM cuenta INNER JOIN usuarios ON
                                             cuenta.idusuarioFK = usuarios.idusuario 
                                             INNER JOIN monedero ON cuenta.idsaldoFK = monedero.idsaldo
                                             where idusuarioFK=${id}`);
        const data = {
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response : null
        };
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.getCuenta = getCuenta;
const getMovimientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, mysql_service_1.default)(`SELECT * FROM movimientos WHERE idcuentaFK = ${req.params.id}`);
        const data = {
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response : null
        };
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.getMovimientos = getMovimientos;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contraseña } = req.body;
    try {
        const cHash = yield (0, handleBcrypt_1.encrypt)(contraseña);
        const response = yield (0, mysql_service_1.default)(`INSERT INTO usuarios (correo, contraseña) VALUES ('${correo}', '${cHash}')`);
        const idMonedero = yield crearMonedero();
        const idCuenta = yield crearCuenta(response.insertId, idMonedero);
        yield movimiento(idCuenta, 0, 0);
        res.status(201).json({ message: 'created', idUser: response.insertId, idCuenta: idCuenta });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.postUser = postUser;
const putRetiro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, retiro } = req.body;
    try {
        const cuenta = yield (0, mysql_service_1.default)(`SELECT * FROM cuenta INNER JOIN usuarios ON cuenta.idusuarioFK = usuarios.idusuario
                                            INNER JOIN monedero ON cuenta.idsaldoFK = monedero.idsaldo where idusuarioFK=${id}`);
        if (retiro >= 5000 && (cuenta[0].saldo - retiro >= 0)) {
            const idSaldo = cuenta[0].idsaldoFK;
            const response = yield (0, mysql_service_1.default)(`UPDATE monedero SET saldo = ${parseInt(cuenta[0].saldo) - retiro} WHERE idsaldo = ${idSaldo}`);
            yield movimiento(cuenta[0].idcuenta, cuenta[0].saldo, parseInt(cuenta[0].saldo) - retiro);
            res.status(201).json({ message: 'updated', cuenta: cuenta[0].idCuenta, response });
        }
        else {
            res.status(201).json({ message: 'Not updated', details: "minimum excceded" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.putRetiro = putRetiro;
const putAbono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, abono } = req.body;
    try {
        const cuenta = yield (0, mysql_service_1.default)(`SELECT * FROM cuenta INNER JOIN usuarios ON cuenta.idusuarioFK = usuarios.idusuario
                                            INNER JOIN monedero ON cuenta.idsaldoFK = monedero.idsaldo where idusuarioFK=${id}`);
        if (abono >= 2000) {
            const idSaldo = cuenta[0].idsaldoFK;
            const response = yield (0, mysql_service_1.default)(`UPDATE monedero SET saldo = ${parseInt(cuenta[0].saldo) + abono} WHERE idsaldo = ${idSaldo}`);
            yield movimiento(cuenta[0].idcuenta, cuenta[0].saldo, parseInt(cuenta[0].saldo) + abono);
            res.status(201).json({ message: 'updated', cuenta: cuenta[0].idCuenta, response });
        }
        else {
            res.status(201).json({ message: 'Not updated', details: "minimum excceded" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.putAbono = putAbono;
function movimiento(idCuenta, saldoAnterior, saldoNuevo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movimiento = yield (0, mysql_service_1.default)(`INSERT INTO movimientos (idcuentaFK, saldoanterior, saldonuevo) VALUES ('${idCuenta}', '${saldoAnterior}', '${saldoNuevo}')`);
            return true;
        }
        catch (error) {
            console.log(error);
            return (error);
        }
    });
}
function crearCuenta(idUsuario, idMonedero) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, mysql_service_1.default)(`INSERT INTO cuenta (idusuarioFK, idsaldoFK) VALUES (${idUsuario}, ${idMonedero})`);
            return response.insertId;
        }
        catch (error) {
            return console.log("error al crear monedero: " + error);
        }
    });
}
function crearMonedero() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, mysql_service_1.default)(`INSERT INTO monedero (saldo) VALUES (0)`);
            return response.insertId;
        }
        catch (error) {
            return console.log("error al crear monedero: " + error);
        }
    });
}
//# sourceMappingURL=controller.js.map