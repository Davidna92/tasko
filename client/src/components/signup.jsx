import React from "react";
import FormComponent from "../common/formComponent";
import {
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import http from '../services/httpService';
// import userService from '../services/userService';
import { myUrl } from '../config.json';

import Joi from "joi-browser";

class Signup extends FormComponent {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .error(() => {
        return {
          message: "Email must be valid",
        };
      }),
    name: Joi.string()
      .required()
      .min(2)
      .error(() => {
        return {
          message: "Name must be greater 2 characters or more",
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .error(() => {
        return {
          message: "Password must be at least 6 characters",
        };
      }),
  };

    doSubmit = async () => {
      const data = { ...this.state.data };
      console.log(data);
      try {
        await http.post(`${myUrl}/users`, data);
        this.props.history.replace("/login"); //change to login
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.setState({ errors: { email: "Email is already taken" } });
        }
      }
    };

  render() {
    // const { errors } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Signup New Account in Tasko
          </Header>
          <Form size="large" onSubmit={this.handleSubmit} autoComplete="off">
            <Segment stacked>
              {this.renderInput("email", "Email")}
              {this.renderInput("name", "Name")}
              {this.renderInput("password", "Password", "password")}
            </Segment>
              {this.renderButton('Submit')}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Signup;
