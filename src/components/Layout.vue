<template>
  <div class="money_app">
    <div id="content" >

      <div class="main" :class="className" ref="Layout">
          <HeaderMain  />
        <div class="main_slot">
          <slot></slot>
        </div>
      </div>
      <Nav />
    </div>
  </div>

</template>

<script lang='ts'>
import HeaderMain from '@/components/statistics/HeaderMain.vue';
export default {
  components: {HeaderMain},
  props:['className'],
  name: "Layout",

}
</script>

<style scoped lang='scss'>
.money_app{
  //overflow: hidden;
  #content{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    .main{
      .main_slot{
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #fff;
        margin-top: -30px;
        position: relative;
      }
      overflow-y: auto;
      //padding-bottom: 100px;
      height: 100%;

    }

  }
}

</style>