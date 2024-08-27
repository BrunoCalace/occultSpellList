import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
/* import Repertoire from './pages/Repertoire' */
import Error from './pages/Error'

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />
          {/* <Route path="/Repertoire" element={ <Repertoire /> } /> */}
          <Route path="/*" element={ <Error /> } />
        </Routes>
      </Router>
    </main>
  )
}

export default App
