<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import navBar from './components/navBar'

  export default {
    data () {
      return {

      }
    },
    components: {
      'nav-bar': navBar
    }
  }
</script>

<style>

</style>
