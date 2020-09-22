import React, { Component } from "react";
import { Icon, Card, Button } from "@material-ui/core/";
import TextArea from "react-textarea-autosize";
import { connect } from "react-redux";
import { addList, addCard } from "../actions/actions";
import listService from "../services/listService";
import cardService from "../services/cardService";
import { getBoardLists } from "../actions/actions";
import { v4 as uuidv4 } from "uuid";

class ActionButton extends Component {
  state = {
    formOpen: false,
    title: "",
    cards: [],
    text: "",
  };

  openForm = () => {
    this.setState({ formOpen: true });
  };

  closeForm = () => {
    this.setState({ formOpen: false });
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
  };

  handleAddList = () => {
    const { title, cards } = this.state;
    const newList = {
      _id: uuidv4(),
      title,
      cards,
    };
    console.log(newList);
    listService.createList(newList);
    this.props.addList(newList);
  };

  handleAddCard = () => {
    //add card
    const { text } = this.state;
    const { listID } = this.props;
    const newCard = {
      // _id: uuidv4(),
      text,
    };
    cardService.createCard(newCard, listID);
    this.props.addCard(newCard, listID);
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0, 0, 0, 0.15)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list ? "Enter list title" : "Enter card title";
    const buttonTitle = list ? "Add  list" : "Add Card";
    return (
      <div>
        <Card
          style={{
            minHeight: 80,
            minWidth: 272,
            boxShadow: "2px 2px 2px grey",
            padding: "6px 8px 2px",
          }}
        >
          <TextArea
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            name={list ? "title" : "text"}
            value={list ? this.state.title : this.state.text}
            onChange={this.handleInputChange}
            style={{
              resize: "none",
              width: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none",
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    const { list } = this.props;
    if (this.state.formOpen && list) return this.renderForm("title");
    if (this.state.formOpen && !list) return this.renderForm("text");
    if (!this.state.formOpen) return this.renderAddButton();
    // return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openFormButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
    margin: 20,
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
};

const mapStateToProps = ({ boardLists, loading, errors }) => ({
  boardLists,
  loading,
  errors,
});

export default connect(mapStateToProps, { addList, addCard, getBoardLists })(
  ActionButton
);
