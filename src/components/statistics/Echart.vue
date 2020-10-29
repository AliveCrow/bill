<template>
  <div class="app">
    <div>
      <span >收支明细</span>
      <button>支出</button>
      <button>收入</button>
    </div>
    <div>
      echarts
    </div>
  </div>
</template>

<script lang='ts'>
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import {Component, Prop} from 'vue-property-decorator';


@Component
export default class Echart extends mixins(listDepository){
  @Prop(String) payOrIncome:string;

  type:string = this.payOrIncome

};
</script>

<style scoped lang='scss'>
@import "public/css/var";
.app{
  //background-color: rgba($selectedColor,.9);
  //padding: 20px;
  span{
    display: block;
    //margin: 20px;
    padding: 20px;
  }
}

</style>