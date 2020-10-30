<template>
  <div>
    <div class="container">
      <Echart name="每日统计" eChartsType="pie" replaceWith="今天没有记录"/>
      <Echart name="每月统计" eChartsType="line" replaceWith="本月没有记录" :date="date"/>
      <InfoList :date="date"/>
    </div>
  </div>

</template>

<script lang='ts'>
// import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import dayjs from 'dayjs';
import Header from '@/components/statistics/Header.vue';
import InfoList from '@/components/statistics/InfoList.vue';
import myEchart from '@/components/statistics/Echart.vue';
import Sum from '@/components/statistics/Sum.vue';

@Component({
  components: {Sum, Echart: myEchart, InfoList, Header}
})
export default class StaticHeader extends mixins(listDepository) {
  payOrIncome: string = '-';
  billyType: string = '月账单';
  date: string = dayjs().format('YYYY-MM');

  yearBilly:number = 0;

}
</script>

<style scoped lang='scss'>
@import "public/css/var";

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

.container {
  background-color: #fff;
  border-radius: 20px;
  //margin-top: -20px;
}
</style>

