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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/social_media";
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.connections[0].readyState) {
        return true;
    }
    yield (0, mongoose_1.connect)(uri);
});
exports.default = connectToDB;
