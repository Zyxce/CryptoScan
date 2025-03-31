"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const news_route_1 = __importDefault(require("./routes/news.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = (0, express_1.default)();
// CORS Middleware с явным указанием источников
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000', // Локальная разработка
        'https://zyxce.github.io', // Продакшен
    ],
    methods: 'GET',
    allowedHeaders: ['Content-Type'],
}));
// Базовые middleware
app.use(express_1.default.json());
// Роуты
app.use('/api/news', news_route_1.default);
// Обработчик ошибок
app.use(error_middleware_1.default);
// Запуск сервера
app.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
    console.log(`Allowed origins: ${[
        'http://localhost:3000',
        'https://zyxce.github.io',
    ].join(', ')}`);
});
