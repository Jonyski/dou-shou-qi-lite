<script setup>
	import { ref, onMounted, toRefs } from 'vue'

	const props = defineProps({
		pieceValue: Number,
		imgSource: String,
		owner: String
	})

	const { owner, pieceValue } = toRefs(props)

	const pieceTypeMap = new Map([
		[1, "rat"],
		[2, "cat"],
		[3, "pig"],
		[4, "bear"],
		[5, "monkey"],
		[6, "tiger"],
		[7, "lion"],
		[8, "elephant"]])

	onMounted(() => {
		let dragStartHandler = (event) => {
			//event.preventDefault()
			event.dataTransfer.dropEffect = "move"
			event.dataTransfer.setData("text/plain", event.target.id)
		}
		// let pieceDropHandler = (event) => {
		// 	event.preventDefault()
		// 	console.log("wtf")
		// }

		let el = document.getElementById(`${owner.value + pieceTypeMap.get(pieceValue.value)}`)
		el.addEventListener("dragstart", dragStartHandler)
		// el.addEventListener("drop", pieceDropHandler)
	})

</script>

<template>
	<div :id="owner + pieceTypeMap.get(pieceValue)" class="piece-div" :data-pieceValue="pieceValue" draggable="true">
		<img class="piece-img" :src="imgSource" draggable="false">
	</div>
</template>

<style scoped>
	.piece-div{
		aspect-ratio: 1/1;
		border-radius: 50%;
		width: 8vh;
		height: 8vh;
		align-self: center;
		justify-self: center;
	}
	.piece-img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		opacity: 1;
		box-shadow: 0px 10px 10px rgba(51, 22, 8, 0.5);
	}
</style>