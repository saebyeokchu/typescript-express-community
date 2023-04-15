import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// css import
import './index.css'
import './css/text.scss'

import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
)
