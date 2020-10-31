<template>
  <div>
    <div class="container">
      <keep-alive>
        <Echart name="每日统计" eChartsType="pie" replaceWith="今天没有记录" />
      </keep-alive>
      <div style="height: 53px;position: relative;background-color: #3da75b">
        <SelectDate   :date.sync="date" class="name" label-class="labelClass" input-class="inputClass" key="200" />
      </div>
      <keep-alive>
        <Echart name="每月统计" eChartsType="line" replaceWith="本月没有记录" :date="date" :key="date" />
      </keep-alive>
    </div>
  </div>

</template>

<script lang='ts'>
import {Component, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import Header from '@/components/Header.vue';
import InfoList from '@/components/money/InfoList.vue';
import myEchart from '@/components/statistics/Echart.vue';
import Sum from '@/components/Sum.vue';
import Moneybox from '@/mixins/Moneybox';
import SelectDate from '@/components/SelectDate.vue';
import dayjs from 'dayjs';

@Component({
  components: {SelectDate, Sum, Echart: myEchart, InfoList, Header}
})
export default class StaticHeader extends mixins(listDepository,Moneybox) {

  payOrIncome: string = '-';
  date: string = dayjs().format('YYYY-MM-DD')
  line:number = 0;


}
</script>

<style scoped lang='scss'>
@import "public/css/var";


.container {
  background-color: #fff;
  border-radius: 20px;
  //margin-top: -20px;

}
</style>

