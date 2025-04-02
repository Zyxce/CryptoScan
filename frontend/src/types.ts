//НОВОСТИ ИНТЕРФЕЙС
export type Article = {
  key: number
  title: string
  url: string
  thumbnail: string | null
  publishedAt: string
  author: string
  source: string
  description: string
}
export interface ICoinGeckoNewsResponse {
  data: {
    id: number
    title: string
    description: string
    url: string
    created_at: number
    thumb_2x: string
    author: string
    news_site: string
  }[]
  count: number
  page: number
}

export interface NewsApiResponse {
  status: string
  totalResults: number
  articles: Article[]
}
// MarketCoin
export interface IMarketCoin {
  symbol: string
  name: string
  nameid: string
  price_usd: string
  percent_change_1h: string
  percent_change_24h: string
  percent_change_7d: string
  rank: string
  price_btc: string
  market_cap_usd: string
  volume24: string
  volume24a: string
  csupply: string
  tsupply: string
  msupply: string
  isMobileBig: boolean
}
//DifferenceMarket
export interface IDifferenceMarket {
  name: string
  base: string
  quote: string
  price: string
  price_usd: string
  headerMarket: string
}

export interface IMarketData {
  name: string
  base: string
  quote: string
  price: number
  price_usd: number
}

export interface ITopDifferenceMarkets {
  highestMarket: IMarketData
  lowestMarket: IMarketData
  differencePrice: string
  isMobileBig: boolean
}
