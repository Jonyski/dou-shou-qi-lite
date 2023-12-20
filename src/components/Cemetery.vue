<script setup>
	const props = defineProps({
		playerNumber: Number
	})
</script>

<template>
	<section class="cemetery" :id="'P' + playerNumber + 'cemetery'">
		
	</section>
</template>

<style scoped>
	.cemetery{
		height: 80vh;
		width: 16vh;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	@media (max-width: 678px){
		.cemetery{
			height: 10vh;
			width: 94.5vw;

			flex-direction: row;
		}
	}
</style>