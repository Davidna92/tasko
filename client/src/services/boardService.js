import { myUrl } from '../config.json';
import http from './httpService';
import jwtDecode from "jwt-decode";


const boardToken = "boardToken";

export function leaveBoard() {
    localStorage.removeItem(boardToken);
}

export function getThisBoard() {
    try {
        const jwt = localStorage.getItem(boardToken);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export async function joinBoard(boardName, boardPassword){
    const { data } = await http.put(`${myUrl}/boards`, {boardName, boardPassword});
    localStorage.setItem(boardToken, data.boardToken);
    console.log(data.boardToken);
}

export async function getBoard(){
    const { data } = await http.get(`${myUrl}/boards/one`)
    console.log(data);
}

export default { joinBoard, getThisBoard, leaveBoard, getBoard };