"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = void 0;
const news_service_1 = require("../services/news.service");
const getNews = async (req, res) => {
    try {
        const newsData = await news_service_1.NewsService.getNews(req);
        res.json(newsData);
    }
    catch (error) {
        console.error('News Controller Error:', error);
        res.status(500).json({
            error: 'Failed to fetch news',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getNews = getNews;
