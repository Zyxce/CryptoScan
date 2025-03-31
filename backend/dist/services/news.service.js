"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
class NewsService {
    static async getNews(req) {
        const { q, from, to, sortBy, pageSize } = req.query;
        const params = {
            q: q?.toString() || 'crypto',
            from: from?.toString() ||
                new Date(Date.now() - 864e5).toISOString().split('T')[0],
            to: to?.toString() || new Date().toISOString().split('T')[0],
            sortBy: ['relevancy', 'popularity', 'publishedAt'].includes(sortBy?.toString() || '')
                ? sortBy?.toString()
                : 'publishedAt',
            pageSize: Number(pageSize) || 10,
            apiKey: config_1.default.NEWS_API_KEY,
            language: 'en',
        };
        const response = await axios_1.default.get('https://newsapi.org/v2/everything', { params, timeout: 10000 });
        if (response.data.status !== 'ok') {
            throw new Error(response.data.status);
        }
        return response.data;
    }
}
exports.NewsService = NewsService;
