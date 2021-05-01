import React, { Component } from "react";
import { Route } from "react-router-dom";
import "antd/dist/antd.css";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
      </>
    );
  }
}

export default App;
