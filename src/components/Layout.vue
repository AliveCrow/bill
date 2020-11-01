<template>
    <div class="money_app">
      <div id="content" >
        <div class="main" :class="className" ref="Layout">
          <div class="main_slot">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang='ts'>
import HeaderMain from '@/components/HeaderMain.vue';
export default {
  components: {HeaderMain},
  props:['className'],
  name: "Layout",

}
</script>

<style scoped lang='scss'>
.money_app{
  #content{
    //height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    .main{
      .main_slot{
        background-color: #fff;
        position: relative;
      }
      overflow-y: auto;
      //padding-bottom: 100px;
      height: 100%;

    }

  }
}

</style>