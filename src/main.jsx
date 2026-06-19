import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// React ilovasini index.html dagi <div id="root"></div> ichiga "mount" qilamiz
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
