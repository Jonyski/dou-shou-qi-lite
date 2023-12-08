<!-- <script>
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'EndGame',
	})
</script> -->

<script setup>
	import { computed } from 'vue'

	const props = defineProps({
			winner: String
		})

	const winnerName = props.winner == "P1" ? 'Player 1' : 'Player 2'
	// const winnerName = computed(() => {
	//   return winner == "P1" ? 'Player 1' : 'Player 2'
	// })
</script>

<template>
	<div id="endGamePopUp" :class="winner">
		<h2 :id="winner + 'wins-text'">{{ winnerName }} WINS!!!</h2>
	</div>
</template>

<style scoped>
	#endGamePopUp{
		position: absolute;
		top: 20vh;
		left: 0vw;
		height: 60vh;
		width: 100vw;
		/*border-top: 10px solid white;
		border-bottom: 10px solid white;*/
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
</style>