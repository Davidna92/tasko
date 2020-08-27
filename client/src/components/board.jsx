import React, { Component } from 'react';
import boardService from '../services/boardService';

class Board extends Component {
    state = {}

async componentDidMount(){
    const board = await boardService.getBoard();
}


    render() {
        return (
            <div>Board</div>
        )
    }
}

export default Board;