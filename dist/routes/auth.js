"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authCtrl_1 = require("../controllers/authCtrl");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/login', authCtrl_1.loginCtrl);
router.post('/register', authCtrl_1.registerCtrl);
//# sourceMappingURL=auth.js.map