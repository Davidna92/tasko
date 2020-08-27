import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { user } = this.props;
    return (
      <Menu size="large">
        <Menu.Item
          name="home"
          // active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        {user && (
          <Menu
            name="group"
            // active={activeItem === "group"}
            onClick={this.handleItemClick}
          />
        )}
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
            <Menu.Item>
              <NavLink to="/join">
                <Button primary>Join Board</Button>
              </NavLink>
            </Menu.Item>
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
