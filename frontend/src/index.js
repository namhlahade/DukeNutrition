import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import App from './javascript/App'
import reportWebVitals from './javascript/reportWebVitals'
import AppProvider from './javascript/context/AppProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
