import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavBar } from "./components/NavBar";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("App"));
