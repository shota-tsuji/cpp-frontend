import React from 'react'
import ReactDOM from 'react-dom/client'
import { createClient, Provider, cacheExchange, fetchExchange } from "urql";
import App from './App.tsx'
import './index.css'

const client = createClient({
  url: 'http://0.0.0.0:8080/',
  exchanges: [cacheExchange, fetchExchange]
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
        <App />
    </Provider>
  </React.StrictMode>,
)
