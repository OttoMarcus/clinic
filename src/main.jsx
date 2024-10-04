import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/Redux/store.js'
import {BrowserRouter} from 'react-router-dom'
import { LanguagesProvider } from './store/Context/LanguageContext/LanguagesContext'
import { BurgerProvider } from './store/Context/BurgerContext/ActiveBurger/ActiveBurger'
import { ErrorBoundary } from "react-error-boundary"
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Provider store={store}>
     <LanguagesProvider>
      <BurgerProvider>
       <BrowserRouter>
        <App />
       </BrowserRouter>
      </BurgerProvider>
     </LanguagesProvider>
    </Provider>
   </ErrorBoundary>
  </React.StrictMode>
)
