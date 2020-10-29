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
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body{
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fontColor;
  line-height: 1.5;
  ::-webkit-scrollbar{
    width: 0;
  }
}
#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}


li,div{
  list-style: none;
  cursor: default;
}

a{
  text-decoration: none;
  color: $fontColor;
}
span{
  cursor: default;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
  height: 0;
}
</style>
