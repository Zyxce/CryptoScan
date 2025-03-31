"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("../controllers/news.controller");
const router = (0, express_1.Router)();
router.get('/', news_controller_1.getNews);
exports.default = router;
