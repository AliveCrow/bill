<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="scss">
@import "public/css/app";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  .main{
    overflow-y: scroll;
  }
}
.selected{
  color: $selectedColor;
}

.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
