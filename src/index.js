import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// //import { BrowserRouter as Router, RouterProvider } from 'react-router-dom'; // Import BrowserRouter for React Router
// import './index.css';
// import App from './App';
// import Blog from './pages/Blog';
// import MemoryLog from './pages/MemoryLog';


// // ReactDOM.render(
// //   <Router>
// //     <React.StrictMode>
// //       <App />
// //     </React.StrictMode>
// //   </Router>,
// //   document.getElementById('root')
// // );



// import {
//   createBrowserRouter, 
//   RouterProvider, 
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/blog",
//     element: <Blog />,
//   },
//   {
//     path: "/memory-log",
//     element: <MemoryLog />,
//   },
// ]);


// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(

//   <RouterProvider router = {router} />
// );



