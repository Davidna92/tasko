import React from "react";
import FormComponent from "../common/formComponent";
import Joi from "joi-browser";
import { Form, Grid, Header, Segment } from "semantic-ui-react";
import boardService from "../services/boardService";

class JoinBoard extends FormComponent {
  state = {
    data: {
      boardName: "",
      boardPassword: "",
    },
    errors: {},
  };

  schema = {
    boardName: Joi.string()
      .required()
      .label("Board Name")
      .error(() => {
        return {
          message: "Board name is not valid",
        };
      }),
    boardPassword: Joi.string()
      .required()
      .min(6)
      .label("Board Password")
      .error(() => {
        return {
          message: "Password must be at least 6 characters",
        };
      }),
  };

  doSubmit = async () => {
    const { boardName, boardPassword } = this.state.data;
    try {
      await boardService.joinBoard(boardName, boardPassword);
      window.location = "/board";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { boardName: ex.response.data } });
      }
    }
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Join to a board
          </Header>
          <Form size="large" onSubmit={this.handleSubmit} autoComplete="off">
            <Segment stacked>
              {this.renderInput("boardName", "Board Name", "boardName")}
              {this.renderInput(
                "boardPassword",
                "Board Password",
                "boardPassword"
              )}
            </Segment>
            {this.renderButton("Join")}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default JoinBoard;
