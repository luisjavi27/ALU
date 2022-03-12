"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const saldoController_1 = require("../controllers/saldoController");
const router = (0, express_1.Router)();
const path = 'getsaldo';
router.get(`/${path}/:id`, saldoController_1.getSaldo);
exports.default = router;
//# sourceMappingURL=saldo.js.map