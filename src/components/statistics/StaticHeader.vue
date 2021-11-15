<template>
  <div>
    <div class="container">
      <div style="height: 53px;position: relative;">
        <label for="start" class="header_input_day" >
          <input type="date" id="start" name="start"
                 min="2020-01-01" ref="year_day"
                 @change="selectDate"
          >
          <eva-icon name="chevron-down-outline" fill="#000" class="icons" key="201"></eva-icon>
        </label>
      </div>
      <keep-alive>
        <Echart name="每日统计" :day="day" eChartsType="pie" replaceWith="今天没有记录"/>
      </keep-alive>
      <div style="height: 53px;position: relative;background-color: #3da75b">
        <SelectDate :date.sync="month" class="name" label-class="labelClass" input-class="inputClass" key1="210"/>
      </div>
      <keep-alive>
        <Echart name="每月统计" eChartsType="line" replaceWith="本月没有记录" :month="month"/>
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
import SelectDate from '@/components/SelectDate.vue';
import dayjs from 'dayjs';

@Component({
  components: {SelectDate, Sum, Echart: myEchart, InfoList, Header}
})
export default class StaticHeader extends mixins(listDepository) {

  payOrIncome = '-';
  month: string = dayjs().format('YYYY-MM-DD');
  day: string = dayjs().format('YYYY-MM-DD');
  line = 0;
  a!: HTMLInputElement;


  mounted() {
    this.a = this.$refs.year_day as HTMLInputElement
    this.a.value = this.month

  }

  selectDate(e: { target: { value: any } }) {
    this.a.value  = e.target.value;
    this.day = e.target.value;
  }

}
</script>

<style scoped lang='scss'>
@import "../../assets/scss/css/var";


.container {
  background-color: #fff;
  border-radius: 20px;
  //margin-top: -20px;
  .header_input_day {
    background-color: rgba($navBgColor,.6);
    padding: 10px;
    border-radius: 5px;
    .icons {
      position: relative;
      top: 7px;
      left: -10px;
      height: 20px;
      width: 20px;
      z-index: 1;
      pointer-events: none;

    }

    > input[type='date'] {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      height: 64px;
      border: none;
      outline: none;
      width: 120px;
      text-align: center;
      position: relative;
      //margin-left: -70px;
      font-family: $font-family;
      font-size: 1rem;
      background-color: transparent;
      &::-webkit-calendar-picker-indicator {
        background-image: none;
        color: #666;
        position: absolute;
        left: -30px;
        outline: none;
        text-align: center;
        width: 100%;
        z-index: 199;
      }
    }
  }

}
</style>

