import React, { useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import './App.css';
import { inject } from '@vercel/analytics';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemoryLog from './components/MemoryLog';
import Photography from './components/Photography';

const App = () => {
  useEffect(() => {
    // Inject the Vercel analytics script when the component mounts
    inject();
  }, []); // The empty array ensures this effect runs only once

  return (
    <div id="app" className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/memory-log" element={<MemoryLog />} />
          <Route path="/photography" element={<Photography />} />
          <Route
            path="/"
            element={
              <>
                <Body />
                <About />
                <Projects />
                <Skills />
                <Timeline />
              </>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
