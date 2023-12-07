<script setup>
	import Piece from './Piece.vue'
	import { onMounted } from 'vue'
	import GameController from '../game-logic/game-controller.js'
	import { Movement } from '../game-logic/movement.js'

	onMounted(() => {
		const GAME_CONTROLER = new GameController()

		let dragOverHandler = (event) => {
			event.preventDefault()
		}

		let onDropHandler = (event) => {
			//TODO: refactor this function
			event.preventDefault()
			let draggedPieceId = event.dataTransfer.getData("text/plain")
			let draggedPiece = document.getElementById(draggedPieceId)
			let targetSquare = event.target
			let playerMoving = GAME_CONTROLER.round % 2 == 0 ? "P2" : "P1"

			GAME_CONTROLER.tryAndMove(new Movement(draggedPiece, targetSquare, playerMoving))
		}

		document.querySelectorAll(".square").forEach(element => {
			element.addEventListener("dragover", dragOverHandler)
			element.addEventListener("drop", onDropHandler)
		})
	})
</script>

<template>
	<section id="board">
		<div class="row">
			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="7" img-source="./lion.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<!-- trap is a square in witch the pieces ranking don't matter, for example a cat can eat an elephant -->
			<div class="square trap" data-square-type="trap">
				
			</div>

			<!-- den is the square in witch the opponent has to get to in order to win -->
			<div class="square den" data-square-type="player2-den">
				
			</div>

			<div class="square trap" data-square-type="trap">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="6" img-source="./tiger.jpg"/>
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="3" img-source="./pig.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square trap" data-square-type="trap">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="2" img-source="./cat.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="1" img-source="./rat.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="5" img-source="./monkey.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="4" img-source="./bear.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P2" :piece-value="8" img-source="./elephant.jpg"/>
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square river" data-square-type="river">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="8" img-source="./elephant.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="4" img-source="./bear.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="5" img-source="./monkey.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="1" img-source="./rat.jpg"/>
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="2" img-source="./cat.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square trap" data-square-type="trap">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="3" img-source="./pig.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>
		</div>

		<div class="row">
			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="6" img-source="./tiger.jpg"/>
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square trap" data-square-type="trap">
				
			</div>

			<div class="square den" data-square-type="player1-den">
				
			</div>

			<div class="square trap" data-square-type="trap">
				
			</div>

			<div class="square normal" data-square-type="normal">
				
			</div>

			<div class="square normal" data-square-type="normal">
				<Piece owner="P1" :piece-value="7" img-source="./lion.jpg"/>
			</div>
		</div>
	</section>
</template>

<style scoped>
	#board{
		height: 81vh;
		width: 63vh;
		background-image: url("/dou-shou-qi_board.jpg");
		background-size: cover;
		background-position-x: -3px;
		background-position-y: -2px;
		background-repeat: no-repeat;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.row{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.square{
		aspect-ratio: 1/1;
		height: 9vh;
		width: 9vh;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	/*.trap{
		background-color: rgba(255, 50, 80, 0.1);
	}
	.den{
		background-color: rgba(255, 0, 0, 0.1);
	}
	.river{
		background-color: rgba(0, 0, 255, 0.1);
	}
	.normal{
		background-color: rgba(255, 255, 255, 0.1);
	}*/
	.square:hover{
		background-color: rgba(255, 255, 255, 0.3);
		transition-duration: 0.2s;
	}
</style>