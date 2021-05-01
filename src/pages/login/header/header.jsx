import React, { Component } from "react";
import "./header.css";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render () {
        return <header className="login_header">管理后台</header>;
    }
}

export default Header;
