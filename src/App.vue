<script setup>
  import GameBoard from './components/GameBoard.vue'
  import Cemetery from './components/Cemetery.vue'
</script>

<template>
  <Cemetery :playerNumber="2"/>
  <GameBoard />
  <Cemetery :playerNumber="1"/>
</template>

<style scoped>
/*.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}*/
</style>
