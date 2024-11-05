import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import Portfolio from './components/Portfolio'
import Dashboard from './components/Dashboard'
import Photography from './components/Photography';
import Skills from './components/Skills';  // Import the new Skills component
import Facts from './components/Facts';  // Import the new Facts component
import './App.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} /> 
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="facts" element={<Facts />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="photography" element={<Photography />} />
        </Route>
      </Routes>
    </>
  )
}

export default App