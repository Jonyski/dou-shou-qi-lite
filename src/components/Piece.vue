<script setup>
	import { ref, onMounted, toRefs, getCurrentInstance } from 'vue'
	import { Movement } from '../game-logic/movement.js'

	const props = defineProps({
		pieceValue: Number,
		imgSource: String,
		owner: String
	})

	const { owner, pieceValue } = toRefs(props)
	const GAME_CONTROLLER = getCurrentInstance().appContext.config.globalProperties.$GAME_CONTROLLER

	const pieceTypeMap = new Map([
		[1, "rat"],
		[2, "cat"],
		[3, "pig"],
		[4, "bear"],
		[5, "monkey"],
		[6, "tiger"],
		[7, "lion"],
		[8, "elephant"]])

	onMounted(function(){
		let dragStartHandler = function(event){
			//event.preventDefault()
			event.dataTransfer.dropEffect = "move"
			event.dataTransfer.setData("text/plain", event.target.id)
		}

		let pieceDragOverHandler = function(event){
			event.preventDefault()
		}

		let pieceDropHandler = function(event){
			event.preventDefault()

			let draggedPieceId = event.dataTransfer.getData("text/plain")
			let draggedPiece = document.getElementById(draggedPieceId)
			let targetSquare = event.target.parentElement.parentElement
			let playerMoving = GAME_CONTROLLER.value.round % 2 == 0 ? "P2" : "P1"

			GAME_CONTROLLER.value.tryAndMove(new Movement(draggedPiece, targetSquare, playerMoving))
		}

		// i'm really sorry, this function is a mess (;-;)
		let pieceClickHandler = function(event){
			let playerMoving = GAME_CONTROLLER.value.round % 2 == 0 ? "P2" : "P1"
			if(event.target.parentElement.id.startsWith(playerMoving)){
				console.log("PIECE SELECTED")
				let selectedEl;
				try{
					selectedEl = document.querySelector(".selected")
					if(selectedEl == event.target.parentElement){
						event.target.parentElement.classList.toggle("selected")
					} else {
						//if a piece is already selected we need to deselect it before selecting the new one
						if(selectedEl){
							selectedEl.classList.remove("selected")
						}
						event.target.parentElement.classList.add("selected")
					}
				} catch(e) {}

			} else {
				let selectedPiece = document.querySelector(".selected")
				let targetSquare = event.target.parentElement.parentElement
				let playerMoving = GAME_CONTROLLER.value.round % 2 == 0 ? "P2" : "P1"

				GAME_CONTROLLER.value.tryAndMove(new Movement(selectedPiece, targetSquare, playerMoving))
			}
		}

		let el = document.getElementById(`${owner.value + pieceTypeMap.get(pieceValue.value)}`)
		el.addEventListener("dragstart", dragStartHandler)
		el.addEventListener("drop", pieceDropHandler)
		el.addEventListener("dragover", pieceDragOverHandler)
		el.addEventListener("click", pieceClickHandler)
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
		width: 7.2vh;
		height: 7.2vh;
		align-self: center;
		justify-self: center;
	}
	.selected{
		border: 0.4vh solid white !important;
	}
	.piece-img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		opacity: 1;
		box-shadow: 0px 10px 10px rgba(51, 22, 8, 0.6);
	}
	#P2elephant, #P2lion, #P2tiger, #P2monkey, #P2bear, #P2pig, #P2cat, #P2rat{
		border: 0.4vh solid rgb(212, 19, 93);
	} 
	#P1elephant, #P1lion, #P1tiger, #P1monkey, #P1bear, #P1pig, #P1cat, #P1rat{
		border: 0.4vh solid rgb(250, 211, 85);
	} 
</style>