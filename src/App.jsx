import './default/normalize.css' // НОРМАЛИЗЕ СИ ЭС ЭС
import './App.css'
import Coins from './components/Сoins/Coins'
import Markets from './components/Markets/Markets'
import MainLayout from './Layouts/MainLayout'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<h1>Not found</h1>} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/markets" element={<Markets />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
