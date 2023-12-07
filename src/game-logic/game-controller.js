import Player from './player.js'
import { Movement, MoveAnalyzer, MoveMaker } from './movement.js'

class GameController {
	constructor() {
		this.player1 = new Player(1)
		this.player2 = new Player(2)
		this.moveAnalyzer = new MoveAnalyzer()
		this.moveMaker = new MoveMaker()
		this.round = 1
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
		return boardState
	}

	tryAndMove(move) {
		let analyzedMove = this.moveAnalyzer.analyze(move, this.getBoardState())
		if(analyzedMove.isValid){
			if(analyzedMove.moveType == "normal"){
				this.moveMaker.makeMove(move)
			} else if(analyzedMove.moveType == "piece eating"){
				this.moveMaker.eatPiece(move)
			}
			console.log("round: " + this.round)
			this.round++
		}
		else{
			return false
		}
	}
}

export default GameController