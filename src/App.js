import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import './App.css';

import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemoryLog from './components/MemoryLog';
import Photography from './components/Photography';

// const App = () => {
//   return (
//     <div id="app" className="App">
//       <Header />
//       <Body />
//       <About />
//       <Projects />
//       <Skills />
//       <Timeline /> 
//       <Footer />
//     </div>
//   );
// }
// const App = () => {
//   return (
//     <div id="app" className="App">
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/memory-log" element={<MemoryLog />} />
//           <Route path="/photography" element={<Photography />} />
//           <Route
//             path="/"
//             element={
//               <>
//                 <Body />
//                 <About />
//                 <Projects />
//                 <Skills />
//                 <Timeline />
//                 <Footer />
//               </>
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

const App = () => {
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




// const App = () => {
//   const location = useLocation();

//   const renderHeader = () => {
//     if (location.pathname === '/memory-log' || location.pathname === '/photography') {
//       return <HeaderWithoutOtherComponents />;
//     } else {
//       return <HeaderWithAllComponents />;
//     }
//   };

//   return (
//     <div id="app" className="App">
//       <Router>
//         {renderHeader()}
//         <Routes>
//           <Route path="/memory-log" element={<MemoryLog />} />
//           <Route path="/photography" element={<Photography />} />
//           <Route
//             path="/"
//             element={
//               <>
//                 <Body />
//                 <About />
//                 <Projects />
//                 <Skills />
//                 <Timeline />
//               </>
//             }
//           />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// };

export default App;


