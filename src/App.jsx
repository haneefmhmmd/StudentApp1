import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";

import StudentForm from "./components/StudentForm";
import "./index.css";

const App = () => (
  <div className="container">
    <StudentForm />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
