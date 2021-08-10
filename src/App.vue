<template>
  <div id="app">
    <vue-planner />
  </div>
</template>

<script>
import VuePlanner from './components/VuePlanner.vue'

export default {
  name: 'App',
  components: {
    VuePlanner
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
