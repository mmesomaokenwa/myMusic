import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { DataProvider } from '../context/DataContext';
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <DataProvider>
          <App />
        </DataProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)

