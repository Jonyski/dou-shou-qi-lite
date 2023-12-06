export class Movement {
	constructor(pieceEl, targetSquare) {
		this.movingPiece = pieceEl
		this.targetSquare = targetSquare
	}
}

export class MoveAnalyzer {
	analyze(move, boardState) {
		console.log(move)
		//just for readability sake
		const pieceTypeMap = new Map([
		[1, "rat"],
		[2, "cat"],
		[3, "pig"],
		[4, "bear"],
		[5, "monkey"],
		[6, "tiger"],
		[7, "lion"],
		[8, "elephant"]])
		let pieceType = pieceTypeMap.get(move.movingPiece.dataset.pieceValue)
		let startingCoords = this.getMoveCoords(move.movingPiece.parentElement, boardState)
		let allowedSquares = []

		let squareAbove = boardState[Math.abs(startingCoords.row - 1)][startingCoords.column]
		let squareBelow = boardState[Math.abs(startingCoords.row + 1)][startingCoords.column]
		let squareAtLeft = boardState[startingCoords.row][Math.abs(startingCoords.column - 1)]
		let squareAtRight = boardState[startingCoords.row][Math.abs(startingCoords.column + 1)]

		allowedSquares.push(squareAbove)
		allowedSquares.push(squareBelow)
		allowedSquares.push(squareAtLeft)
		allowedSquares.push(squareAtRight)

		if(move.targetSquare == move.movingPiece.parentElement){
			return false //cant move to current square
		}
		if(!allowedSquares.includes(move.targetSquare)){
			return false
		}

		//some pieces have special movements, so I find it best to abstract
		//those specific cases to other function
		if(pieceType == "lion"){
			this.analyzeLionMove(move)

		} else if(pieceType == "tiger"){
			this.analyzeTigerMove(move)

		} else if(pieceType == "rat"){
			this.analyzeRatMove(move)

		} else { //all other pieces move equally
			//checking for availability
			if(move.targetSquare.dataset.squareType != "river" && move.targetSquare.innerHTML == ""){
				return true
			}

			//checking if its possible to eat
			if(move.targetSquare.innerHTML != ""){
				//holy cow that's a long and ugly line
				return parseInt(move.targetSquare.children[0].dataset.piecevalue) <= parseInt(move.movingPiece.dataset.piecevalue) ? true : false
			}

			return false
		}
	}

	analyzeLionMove(move) {
		return true
	}

	analyzeTigerMove(move) {
		return true
	}

	analyzeRatMove(move) {
		return true
	}

	getMoveCoords(startingSquare, boardState){
		//console.log(boardState)
		for(let i = 0; i <= 8; i++){
			for(let j = 0; j <= 6; j++){
				if(boardState[i][j] == startingSquare){
					return {row: i, column: j}
				}
			}
		}
	}
}