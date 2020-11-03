<template>
  <div id="app">
    <router-view  style="height:100%;overflow-y:auto" :key="this.$route.name" :showHeight.sync="showHeight"   />
    <Nav v-show="!(name ==='NotFound') "  ref="nav" style="position: fixed;bottom: 0;width: 100%" :class="{show:!hideshow}"  />
  </div>
</template>
<script>

export default {
  data(){
    return {
      name:'',
      hideshow:true,
      showHeight:0,
      docmHeight:document.documentElement.clientHeight || document.body.clientHeight
    }
  },
  created() {
    this.name = this.$route.name

  },
  mounted() {
    //监听软键盘事件

  },
  watch: {
    //监听显示高度
    showHeight:function() {
      if(this.docmHeight > this.showHeight){
        //隐藏
        this.hideshow=false
      }else{
        //显示
        this.hideshow=true
      }
    }
  },
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
  //overflow: hidden;
}
.show{
  visibility: hidden;
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
