import React, { Component } from "react";
import TaskList from "./taskList";
import ActionButton from "./actionButton";
import { DragDropContext } from "react-beautiful-dnd";
// import { sort } from "../actions";
import { connect } from "react-redux";
import styled from "styled-components";
import { getBoardLists } from "../actions/actions";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 8px;
`;

class Board extends Component {
  componentDidMount() {
    this.props.getBoardLists();
  }

  // onDragEnd = (result) => {
  //   // what happend after i drag
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   this.props.dispatch(
  //     sort(
  //       source.droppableId,
  //       destination.droppableId,
  //       source.index,
  //       destination.index,
  //       draggableId
  //     )
  //   );
  // };

  render() {
    const { boardLists } = this.props;
    console.log(boardLists);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h1>Board</h1>
          <ListContainer>
            {boardLists.map((list) => (
              <div key={list._id}>
                <TaskList list={list} key={list._id} />
                <ActionButton listID={list._id}  />
              </div>
            ))}
          </ListContainer>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = ({ boardLists, loading, errors }) => ({
  boardLists,
  loading,
  errors,
});

export default connect(mapStateToProps, { getBoardLists })(Board);
