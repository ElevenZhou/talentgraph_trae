import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Converter from './pages/Converter'
import GraphView from './pages/GraphView'
import Matching from './pages/Matching'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/graph/:id" element={<GraphView />} />
        <Route path="/matching/:id" element={<Matching />} />
      </Routes>
    </Layout>
  )
}

export default App
