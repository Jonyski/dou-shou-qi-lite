import Player from './player.js'
import { Movement, MoveAnalyzer } from './movement.js'

class GameController {
	constructor() {
		this.player1 = new Player(1)
		this.player2 = new Player(2)
		this.moveAnalyzer = new MoveAnalyzer()
	}

	getBoardState(){
		let board = document.getElementById("board")
		let boardState = []

		let i = 0
		for(let row of board.children){
			boardState.push([])
			for(let square of row.children){
				boardState[i].push(square)
			}
			i++
		}
		console.log("BOARD STATE:")
		console.log(boardState)
		return boardState
	}

	isValidMove(move) {
		return this.moveAnalyzer.analyze(move, this.getBoardState())
	}

	tryAndMove(move) {
		if(this.isValidMove(move)){
			move.movingPiece.parentElement.innerHTML = ""
			move.targetSquare.appendChild(move.movingPiece)
		}
		else{
			return false
		}
	}
}

export default GameController