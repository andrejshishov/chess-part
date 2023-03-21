import React,{useState, useEffect} from 'react';
import  './App.css';

import BoardComponent from './BoardComponent';
import { Board } from '../models/Board';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import LostFigures from "./LostFigures";
import Timer from "./Timer";

const App = () => {

const [board, setBoard] = useState(new Board());
const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer);
  }, [])

function restart() {
 const newBoard = new Board();
 newBoard.initCells();
 newBoard.addFigures()
 setBoard(newBoard)
}

function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

return (
    <div className = "app">
        <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />
        <BoardComponent 
        board ={board}
        setBoard = {setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        />
        <div>
            <LostFigures 
            title="Черные фигуры" 
            figures={board.lostBlackFigures}/>
            <LostFigures 
            title="Белые фигуры" 
            figures={board.lostWhiteFigures}/>
        </div>
    </div>
)
}


export default App;