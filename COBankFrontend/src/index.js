import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from "react-router-dom"; // import Router instead of BrowserRouter
import history from "./history"; // import your custom history object
import "@fortawesome/fontawesome-free/css/all.min.css";
import Main from "./MainComponent";


ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById("root")
);
