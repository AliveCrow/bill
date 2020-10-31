<template>
  <div id="header_main_app">
    <Header
        :billyType.sync="billyType"
        :payOrIncome.sync="payOrIncome"
        :date.sync="dateYYYYMM"
    />
    <Sum
        :payOrIncome="payOrIncome"
        :total="total"
        :billy="billy"
    />
  </div>
</template>

<script lang='ts'>

import {Component, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import Header from '@/components/Header.vue';
import Sum from '@/components/Sum.vue';
import listDepository from '@/mixins/listDepository';
import dayjs from 'dayjs';
import Moneybox from '@/mixins/Moneybox';

@Component({
  name: 'HeaderMain',
  components: {Sum, Header}
})
export default class HeaderMain extends mixins(listDepository, Moneybox) {
  //todo type.3
  payOrIncome: string = '-';
  billyType: string = '月账单';
  monthListObj: { list: [], date: string };
  payOrIncomeSelectObj: { date: string, payOrIncome: string };

  init() {
    this.monthListObj.list = this.records;
    this.$store.commit('billyStore/reset');
    this.$store.commit('billyStore/MonthList', this.monthListObj);
    this.$store.commit('billyStore/payOrIncomeSelect', this.payOrIncomeSelectObj);
  }

  created() {
    this.monthListObj = {
      list: this.records,
      date: this.date_YYYY_MM
    };
    this.payOrIncomeSelectObj = {
      date: this.date_YYYY_MM,
      payOrIncome: this.payOrIncome
    };
    this.init();
  }

  @Watch('primordialRecords')
  onprimordialRecords() {
    this.onBillyType();
  }

  @Watch('payOrIncome')
  onPayOrIncome() {
    this.payOrIncomeSelectObj.payOrIncome = this.payOrIncome;
    this.onBillyType();
  }

  @Watch('date_YYYY_MM')
  onDate() {
    this.monthListObj.date = this.date_YYYY_MM;
    this.payOrIncomeSelectObj.date = this.date_YYYY_MM;
    this.init();
    this.$store.commit('setDate', this.date_YYYY_MM);
  }

  @Watch('billyType')
  onBillyType() {
    //todo 优化-使用展开运算符看看?
    //
    this.$store.commit('billyStore/reset');
    let currentYear;
    let currentYearAllist: [] = [];
    let billy: number = 0;
    let total: number = 0;
    let date = dayjs(this.date_YYYY_MM).format('YYYY');

    if (this.billyType === '年账单') {
      // @ts-ignore
      let includeCurrentYear = this.records.filter(item =>
          dayjs(item.createAt).format('YYYY') === date
      );
      // @ts-ignore
      currentYear = includeCurrentYear.map(item => {
        return item.items;
      });
      let a: any[] = [];
      let x = currentYear.forEach((item: any[]) => {
        item.forEach(item => {
          if (item.types === this.payOrIncome) {
            a.push(item);
          }
        });
      });
      for (let i = 0; i < a.length; i++) {
        // @ts-ignore
        currentYearAllist = a.map(item => {
          return item;
        });
      }
      total = a.length;
      currentYearAllist.forEach(item => {
        // @ts-ignore
        billy = billy + item.num;
      });
      this.$store.commit('billyStore/setBilly', {billy, total});
    } else {
      this.init();
    }
  }

}


</script>

<style scoped lang='scss'>
@import "../../public/css/var";

#header_main_app {
  height: 280px;
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