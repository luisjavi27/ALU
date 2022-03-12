"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaldo = void 0;
const mysql_service_1 = __importDefault(require("../services/mysql.service"));
const getSaldo = (req, res) => {
    const { id } = req.params;
    (0, mysql_service_1.default)(`SELECT * FROM monedero WHERE idsaldo = ${req.params.id}`).then((response) => {
        const data = {
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response[0] : null
        };
        res.json(data);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
};
exports.getSaldo = getSaldo;
//# sourceMappingURL=saldoController.js.map