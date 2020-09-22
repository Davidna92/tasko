import React, { Component } from "react";
import TaskCard from "./taskCard";
import ActionButton from "./actionButton";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
// import listService from "../services/listService";
// import cardService from "../services/cardService";
import { getBoardLists } from "../actions/actions";


const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin-right: 8px;
`;

class TaskList extends Component {
  // state = {
  //   title: '',
  //   cards: [],
  // };

  // async componentDidMount() {
  //   const { data } = await listService.getList(this.props.listID);
  //   this.setState({ title: data.title, cards: data.cards });
  //   this.props.getBoardLists();
  //   console.log(this.props)
  // }

  render() {
    const { list } = this.props;

    return (
      <Droppable droppableId={String(list._id)}>
        {(provided) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            <h4>{list.title}</h4>
            {list.cards.map((card, index) => (
              <TaskCard
                text={card.text}
                key={card._id}
                id={card.id}
                index={index}
              />
            ))}
            {provided.placeholder}
            <ActionButton listID={list._id} />
          </ListContainer>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = ({ boardLists, loading, errors }) => ({
  boardLists,
  loading,
  errors,
});

export default connect(mapStateToProps, { getBoardLists })(TaskList);