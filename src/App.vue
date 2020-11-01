<template>
  <div id="app">
     <router-view style="height:100vh;overflow-y: auto" />
    <Nav v-show="!(name ==='NotFound')" />
  </div>
</template>
<script>

export default {

  data(){
    return {
      name:''
    }
  },
  created() {
    this.name = this.$route.name
  }

}
</script>
<style lang="scss">
@import "assets/scss/css/app";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fontColor;
  line-height: 1.5;
  overflow-y:hidden;
  ::-webkit-scrollbar {
    width: 0;
  }
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  flex-direction: column;
  display: flex;
  height: 100vh;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

li, div {
  list-style: none;
  cursor: default;
}

a {
  text-decoration: none;
  color: $fontColor;
}

span {
  cursor: default;
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
  height: 0;
}


.toggle_ani-enter-active, .toggle_ani-leave-active{
  transition: opacity .5s;
}
.toggle_ani-enter, .toggle_ani-leave-to {
  opacity: 0;
}


</style>
