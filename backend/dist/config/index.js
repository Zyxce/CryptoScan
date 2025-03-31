"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 3001,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
