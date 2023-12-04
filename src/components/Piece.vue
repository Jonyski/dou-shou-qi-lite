<script setup>
	defineProps({
		pieceValue: Number,
		imgSource: String
	})
</script>

<template>
	<div class="piece-div" :data-pieceValue="pieceValue">
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
	}
</style>