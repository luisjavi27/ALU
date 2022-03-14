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
const { verifyToken } = require('../services/generateToken');
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = yield verifyToken(token);
        console.log(token);
        console.log("id " + tokenData._id);
        if (tokenData._id) {
            next();
        }
        else {
            res.status(409);
            res.send({ error: 'Tu por aqui no pasas!' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(409);
        res.send({ error: 'Tu por aqui no pasas!' });
    }
});
module.exports = checkAuth;
//# sourceMappingURL=auth.js.map