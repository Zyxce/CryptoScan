import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import './default/normalize.css' // НОРМАЛИЗЕ СИ ЭС ЭС
import './App.css'
import Coins from './components/Сoins/Coins'
import Markets from './components/Markets/Markets'
import MainLayout from './Layouts/MainLayout'
import Home from './components/Home'
import Exchanges from './components/Exchanges/Exchanges'

import NotFound from './components//Events/NotFound'
import Loading from './components/Events/Loading'
import Error from './components/Events/Error'

function App() {
  const [selectedCoinId, setSelectedCoinId] = useState('80')

  function handleSelectedCoindId(newId) {
    console.log(newId)
    setSelectedCoinId(newId)
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/exchanges" element={<Exchanges />}></Route>
            <Route
              path="/coins"
              element={<Coins toggleSelectedCoinId={handleSelectedCoindId} />}
            />
            <Route
              path="/markets"
              element={<Markets selectedCoinId={selectedCoinId} />}
            />
            {/* test events */}
            <Route
              path="/event/loading"
              element={<Loading type={'TestEvent'} />}
            ></Route>
            <Route
              path="/event/error"
              element={<Error error={'YARIK PIZDEC BACHOK POTIK'} />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
