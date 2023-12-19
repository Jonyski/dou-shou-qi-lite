<script setup>
	import { computed, onMounted, h, render } from 'vue'
	import GameBoard from './GameBoard.vue'
	import Cemetery from './Cemetery.vue'

	const props = defineProps({
			winner: String
		})
	const winnerName = props.winner == "P1" ? 'Player 1' : 'Player 2'

	onMounted(function(){
		let playAgain = function(event){
			document.getElementById("board").remove()
			document.getElementById("P1cemetery").remove()
			document.getElementById("P2cemetery").remove()
			const newBoard = h(GameBoard)
			const newP1Cemetery = h(Cemetery, {playerNumber: 1})
			const newP2Cemetery = h(Cemetery, {playerNumber: 2})
			const appEl = document.getElementById("app")
			render(newP2Cemetery, appEl)
			render(newBoard, appEl)
			render(newP1Cemetery, appEl)
		}

		document.getElementById("playAgainButton").addEventListener("click", playAgain)
	})
</script>

<template>
	<div id="endGamePopUp" :class="winner">
		<h2 :id="winner + 'wins-text'">{{ winnerName }} WINS!!!</h2>
		<button id="playAgainButton" type="button">play again</button>
	</div>
</template>

<style scoped>
	#endGamePopUp{
		position: absolute;
		top: 20vh;
		left: 0vw;
		height: 60vh;
		width: 100vw;

		background-color: rgba(0, 0, 0, 0.5);
		background-image: url("./firework.gif");
		background-repeat: no-repeat;
		background-size: contain;
		background-position-x: 50%;
	}

	h2{
		font-size: 128px;
		font-weight: bolder;
		color: white;
		margin-top: 6vh;
		margin-bottom: 6vh;
	}

	.P2{
		border-top: 10px solid rgb(212, 19, 93);
		border-bottom: 10px solid rgb(212, 19, 93);
	}
	#P2wins-text{
		color: rgb(212, 19, 93);
	}

	.P1{
		border-top: 10px solid rgb(250, 211, 85);
		border-bottom: 10px solid rgb(250, 211, 85);
	}
	#P1wins-text{
		color: rgb(250, 211, 85);
	}

	button{
		width: 12vw;
		aspect-ratio: 3/1;
		border-radius: 1vw;
		border: 0px solid white;
		background-color: white;
		font-size: 1.5vw;
	}
	button:hover{
		background-color: white;
		background: linear-gradient(rgb(212, 19, 93), rgb(250, 211, 85));
		transform: scale(1.04);
	}
</style>