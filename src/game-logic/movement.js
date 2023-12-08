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

		if(!this.isValidMove(move, this.getAllowedSquares(pieceType, startingCoords, boardState, move.playerMoving))){
			return {isValid: false, moveType: null}
		} else{

			//checking if its a eating move
			if(move.targetSquare.innerHTML != ""){
				if(this.canEatPiece(move)){
					return {isValid: true, moveType: "piece eating"}
				} else {
					return {isValid: false, moveType: null}
				}
			}

			// checking if its a winning move
			if(move.targetSquare.dataset.squareType.endsWith("den") && !move.targetSquare.dataset.squareType.startsWith(move.playerMoving)){
				return {isValid: true, moveType: "game winning"}
			}

			return {isValid: true, moveType: "normal"}
		}

		return {isValid: false, moveType: null}
	}

	getMoveCoords(startingSquare, boardState){
		for(let i = 0; i <= 8; i++){
			for(let j = 0; j <= 6; j++){
				if(boardState[i][j] == startingSquare){
					return {row: i, column: j}
				}
			}
		}
	}

	getAllowedSquares(pieceType, startingCoords, boardState, playerMoving){
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

		if(this.isHisOwnDen(squareAbove, playerMoving)){
			squareAbove = `the square above is your den ${playerMoving}`
		}
		if(this.isHisOwnDen(squareBelow, playerMoving)){
			squareBelow = `the square below is your den ${playerMoving}`
		}
		if(this.isHisOwnDen(squareAtLeft, playerMoving)){
			squareAtLeft = `the square to the left is your den ${playerMoving}`
		}
		if(this.isHisOwnDen(squareAtRight, playerMoving)){
			squareAtRight = `the square to the right is your den ${playerMoving}`
		}

		if(pieceType == "lion"){
			try{
				if(this.isRiver(squareAbove)){
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "vertical", path: [-1, -2, -3]})){
						squareAbove = boardState[row - 4][column]
					}
				}
			} catch(e) {}
			try{
				if(this.isRiver(squareBelow)){
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "vertical", path: [1, 2, 3]})){
						squareBelow = boardState[row + 4][column]
					}
				}
			} catch(e) {}
			try{
				if(this.isRiver(squareAtLeft)){
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "horizontal", path: [-1, -2]})){
						squareAtLeft = boardState[row][column - 3]
					}
				}
			} catch(e) {}
			try{
				if(this.isRiver(squareAtRight)){
					if(!this.isRatBlocking(boardState, startingCoords, {direction: "horizontal", path: [1, 2]})){
						squareAtRight = boardState[row][column + 3]
					}
				}
			} catch(e){}
		} else if(pieceType == "tiger"){
			try{
				if(this.isRiver(squareAbove)){
					squareAbove = "there is no square above :v"
				}
			} catch(e){}
			try{
				if(this.isRiver(squareBelow)){
					squareBelow = "there is no square below :3"
				}
			} catch(e){}
			try{
				if(this.isRiver(squareAtLeft)){
					squareAtLeft = boardState[row][column - 3]
				}
			} catch(e){}
			try{
				if(this.isRiver(squareAtRight)){
					squareAtRight = boardState[row][column + 3]
				}
			} catch(e){}
		} else if(pieceType == "rat"){
			//rat can move anywhere
		} else {
			try{
				if(this.isRiver(squareAbove)){
					squareAbove = "there is no square above :v"
				}
				if(this.isRiver(squareBelow)){
					squareBelow = "there is no square below :3"
				}
				if(this.isRiver(squareAtLeft)){
					squareAtLeft = "there is no square to the left :o"
				}
				if(this.isRiver(squareAtRight)){
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
		let eatenValue = parseInt(move.targetSquare.children[0].dataset.piecevalue)
		let eaterValue = parseInt(move.movingPiece.dataset.piecevalue)
		//normal eating OR rat eating elephant OR eating in a trap square
		if(eatenValue <= eaterValue || (eatenValue == 8 && eaterValue == 1) || move.targetSquare.dataset.squareType == "trap"){
			if(!move.targetSquare.children[0].id.startsWith(move.playerMoving)){
				return true
			} else {
				return false
			}
		}
		return false
	}

	isRiver(square){
		return square.dataset.squareType == "river"
	}

	isHisOwnDen(square, player){
		try{
			return square.dataset.squareType.endsWith("den") && square.dataset.squareType.startsWith(player)
		} catch(e) {
			return false
		}
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