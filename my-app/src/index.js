import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { store } from "./store/store"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"

import backgroundImage from "./resources/images/background.png"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App style={{ backgroundImage: backgroundImage }} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
