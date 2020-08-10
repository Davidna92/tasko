import React, { Component } from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import userService from "./services/userService";

//components
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Signup from "./components/signup";
import Login from "./components/login";
import Logout from "./components/logout";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = await userService.getThisUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: "900px" }}>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
