export class Movement {
	constructor(pieceEl, targetSquare, playerMoving) {
		this.movingPiece = pieceEl
		this.targetSquare = targetSquare
		this.playerMoving =  playerMoving
	}
}

export class MoveAnalyzer {
	//returns an object containing a bool (true if its possible to move)
	//and a moveType ("normal" or "piece eating")
	analyze(move, boardState) {
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

		let pieceType = pieceTypeMap.get(parseInt(move.movingPiece.dataset.piecevalue))
		let startingCoords = this.getMoveCoords(move.movingPiece.parentElement, boardState)

		//some pieces have special movements, so I find it best to abstract
		//those specific cases to other function
		// if(pieceType == "lion"){
		// 	this.analyzeLionMove(move, startingCoords, boardState)

		// } else if(pieceType == "tiger"){
		// 	this.analyzeTigerMove(move, startingCoords, boardState)

		// } else if(pieceType == "rat"){
		// 	this.analyzeRatMove(move, startingCoords, boardState)

		// } else { //all other pieces move equally

		if(!this.isValidMove(move, this.getAllowedSquares(pieceType, startingCoords, boardState))){
			console.log("MOVE NOT ALLOWED")
			return {isValid: false, moveType: null}
		} else{		
			if(move.targetSquare.innerHTML != ""){
				if(this.canEatPiece(move)){
					return {isValid: true, moveType: "piece eating"}
				} else {
					return {isValid: false, moveType: null}
				}
			}

			return {isValid: true, moveType: "normal"}
		}

		//checking if its possible to eat

		return {isValid: false, moveType: null}
		//}
	}

	// analyzeLionMove(move, startingCoords, boardState) {
	// }

	// analyzeTigerMove(move, startingCoords, boardState) {
	// }

	// analyzeRatMove(move, startingCoords, boardState) {
	//}

	getMoveCoords(startingSquare, boardState){
		for(let i = 0; i <= 8; i++){
			for(let j = 0; j <= 6; j++){
				if(boardState[i][j] == startingSquare){
					return {row: i, column: j}
				}
			}
		}
	}

	getAllowedSquares(pieceType, startingCoords, boardState){
		console.log("GETTING ALLOWED SQUARES")
		let row = startingCoords.row
		let column = startingCoords.column

		let allowedSquares = []
		let squareAbove = "there is no square above :v"
		let squareBelow = "there is no square below :3"
		let squareAtLeft = "there is no square to the left :o"
		let squareAtRight = "there is no square to the right :("

		if(startingCoords.row >= 1){
			squareAbove = boardState[Math.abs(row - 1)][column]
		}
		if(startingCoords.row <= 7){
			squareBelow = boardState[Math.abs(row + 1)][column]	
		}
		if(startingCoords.column >= 1){
			squareAtLeft = boardState[row][Math.abs(column - 1)]
		}
		if(startingCoords.column <= 5){
			squareAtRight = boardState[row][Math.abs(column + 1)]
		}

		if(pieceType == "lion"){
			try{
				if(squareAbove.dataset.squareType == "river"){
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "vertical", path: [-1, -2, -3]})){
						squareAbove = boardState[row - 4][column]
					}
				}
			} catch(e) {}
			try{
				if(squareBelow.dataset.squareType == "river"){
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "vertical", path: [1, 2, 3]})){
						squareBelow = boardState[row + 4][column]
					}
				}
			} catch(e) {}
			try{
				if(squareAtLeft.dataset.squareType == "river"){
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "horizontal", path: [-1, -2]})){
						squareAtLeft = boardState[row][column - 3]
					}
				}
			} catch(e) {}
			try{
				if(squareAtRight.dataset.squareType == "river"){
					console.log("RIGHT SQUARE IS A RIVER")
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "horizontal", path: [1, 2]})){
						squareAtRight = boardState[row][column + 3]
					}
				}
			} catch(e){}
		} else if(pieceType == "tiger"){
			try{
				if(squareAbove.dataset.squareType == "river"){
					squareAbove = "there is no square above :v"
				}
			} catch(e){}
			try{
				if(squareBelow.dataset.squareType == "river"){
					squareBelow = "there is no square below :3"
				}
			} catch(e){}
			try{
				if(squareAtLeft.dataset.squareType == "river"){
					squareAtLeft = boardState[row][column - 3]
				}
			} catch(e){}
			try{
				if(squareAtRight.dataset.squareType == "river"){
					squareAtRight = boardState[row][column + 3]
				}
			} catch(e){}
		} else if(pieceType == "rat"){
			//rat can move anywhere
		} else {
			try{
				if(squareAbove.dataset.squareType == "river"){
					squareAbove = "there is no square above :v"
				}
				if(squareBelow.dataset.squareType == "river"){
					squareBelow = "there is no square below :3"
				}
				if(squareAtLeft.dataset.squareType == "river"){
					squareAtLeft = "there is no square to the left :o"
				}
				if(squareAtRight.dataset.squareType == "river"){
					squareAtRight = "there is no square to the right :("
				}
			} catch(e){}
		}

		allowedSquares.push(squareAbove)
		allowedSquares.push(squareBelow)
		allowedSquares.push(squareAtLeft)
		allowedSquares.push(squareAtRight)
		console.log(allowedSquares)
		return allowedSquares
	}

	isValidMove(move, allowedSquares){
		if(move.targetSquare == move.movingPiece.parentElement){
			console.log("cant move to current square")
			return false //cant move to current square
		}
		if(!allowedSquares.includes(move.targetSquare)){
			console.log("cant move to an unallowed square")
			return false //cant move to an unallowed square
		}
		if(!move.movingPiece.id.startsWith(move.playerMoving)){
			console.log("cant move when its not your turn")
			return false //cant move when its not your turn
		}
		return true
	}

	isRatBlocking(boardState, startingCoords, jumpMove){
		console.log("CHECKING RIVER FOR RAT")
		if(jumpMove.direction == "vertical"){
			for(let rowOffset of jumpMove.path){
				if(boardState[startingCoords.row + rowOffset][startingCoords.column].innerHTML != ""){
					return true
				}
			}
			return false
		} else {
			console.log("HORIZONTAL JUMP")
			for(let columnOffset of jumpMove.path){
				if(boardState[startingCoords.row][startingCoords.column + columnOffset].innerHTML != ""){
					return true
				}
			}
			return false
		}
	}

	canEatPiece(move){
		if(parseInt(move.targetSquare.children[0].dataset.piecevalue) <= parseInt(move.movingPiece.dataset.piecevalue)){
			if(!move.targetSquare.children[0].id.startsWith(move.playerMoving)){
				//return {isValid: true, moveType: "piece eating"}
				return true
			} else {
				//return {isValid: false, moveType: null}
				return false
			}
		}
		return false
	}
}

export class MoveMaker {
	makeMove(move){
		move.movingPiece.parentElement.innerHTML = ""
		move.targetSquare.appendChild(move.movingPiece)
	}

	eatPiece(move){
		let eatenPieceImg = move.targetSquare.children[0].children[0]
		move.targetSquare.innerHTML= ""
		this.makeMove(move)
		document.getElementById(`${move.playerMoving}cemetery`).appendChild(eatenPieceImg)
	}

}