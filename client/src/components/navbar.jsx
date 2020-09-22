import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  async componentDidMount() {
    if (this.props.board) {
      window.location = "/board";
    }
  }

  render() {
    const { user, board } = this.props;
    return (
      <Menu size="large">
        <Menu.Item name="home" />
        {user && <Menu name="group" />}
        {!user && (
          <Menu.Menu position="right">
            <Menu.Item>
              <NavLink to="/login">
                <Button primary>Log in</Button>
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/signup">
                <Button primary>Sign Up</Button>
              </NavLink>
            </Menu.Item>
          </Menu.Menu>
        )}
        {user && (
          <Menu.Menu position="right">
            {!board && (
              <Menu.Item>
                <NavLink to="/join">
                  <Button primary>Join Board</Button>
                </NavLink>
              </Menu.Item>
            )}
            {board && (
              <Menu.Item>
                <NavLink to="/leave">
                  <Button primary>Leave Board</Button>
                </NavLink>
              </Menu.Item>
            )}
            <Menu.Item>
              <NavLink to="/logout">
                <Button secondary>Log out</Button>
              </NavLink>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

export default Navbar;
