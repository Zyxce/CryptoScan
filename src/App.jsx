import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import './default/normalize.css' // НОРМАЛИЗЕ СИ ЭС ЭС
import './App.css'
import Coins from './components/Сoins/Coins'
import Markets from './components/Markets/Markets'
import MainLayout from './Layouts/MainLayout'
import Home from './components/Home/Home'
import Exchanges from './components/Exchanges/Exchanges'
import NotFound from './components//Events/NotFound'
import Loading from './components/Events/Loading'
import Error from './components/Events/Error'

function App() {
  const [selectedCoinMarkets, setSelectedCoinMarkets] = useState([
    '80',
    'Etherium',
  ])

  function handleSelectedCoindId(newId, newName) {
    setSelectedCoinMarkets([newId, newName])
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/CryptoScan" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/CryptoScan/exchanges" element={<Exchanges />}></Route>
            <Route
              path="/CryptoScan/coins"
              element={<Coins toggleSelectedCoinId={handleSelectedCoindId} />}
            />
            <Route
              path="/CryptoScan/markets"
              element={<Markets selectedCoinMarkets={selectedCoinMarkets} />}
            />
            {/* <Route
              path="/CryptoScan/topmovers"
              element={
                <TopMovers toggleSelectedCoinId={handleSelectedCoindId} />
              }
            /> */}
            {/* test events */}
            <Route
              path="/CryptoScan/event/loading"
              element={<Loading type={'TestEvent'} />}
            ></Route>
            <Route
              path="/CryptoScan/event/error"
              element={<Error error={'YARIK PIZDEC BACHOK POTIK'} />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
