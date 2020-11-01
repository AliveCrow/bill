<template>
  <div id="app">
      <router-view style="height: 100%;overflow-y: auto" />
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
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  pointer-events: none;

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

header {
  height: 300px;
  background-color: rgba($headerColor, .9);
  color: rgba($whiteColor, .6);
  padding-top: 50px;
  display: flex;
  flex-direction: column;

  .header_nav {
    font-size: 1.1rem;
    margin-bottom: 20px;

    > span {
      margin: 0 20px;
      padding: 5px 0;
      position: relative;
    }

    .month {

    }

    .year {

    }

    .selected {
      color: #fff;
    }

    .selected:after {
      content: '';
      width: 100%;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      border: 1px solid #fff;
      border-radius: 5px;
    }
  }

  .header_middle {
    display: flex;
    align-items: center;
    position: relative;

    .header_middle_select {
      position: absolute;
      right: 0;
      margin-right: 15px;

      > span {
        font-size: .8rem;
        padding: 1px 5px;
        margin: 0 10px;
      }

      > .selected {
        border: 1px solid #fff;
        border-radius: 50px;
        color: #fff;
      }
    }

    input[type='month']::-webkit-calendar-picker-indicator {
      background-image: none;
      margin-right: 10px;
      color: #666;
      position: absolute;
      width: 100px;
      left: 0;
      outline: none;
    }

    .icons {
      position: absolute;
      left: 105px;
      height: 20px;
      pointer-events: none;
    }

    input[type='month'] {
      width: 100px;
      font-family: $font-family;
      margin-left: 30px;
      line-height: 1.1rem;
      outline: none;
      border: none;
      background-color: #fff0;
      color: #fff;

    }
  }

  .header_bottom {
    position: relative;
    align-self: flex-start;
    padding-top: 40px;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    span {
      font-size: .6rem;
    }

    .consume {
      color: #fff;
      font-size: 2.6rem;
      overflow: hidden;
      margin-top: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      text-align: left;
    }

  }

}

</style>
