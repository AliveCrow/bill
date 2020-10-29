<template>
  <div>
    <header>
      <Header
          :billyType.sync="billyType"
          :payOrIncome.sync="payOrIncome"
          :date.sync="date"
      />
      <div class="header_bottom">
        <span>共{{ payOrIncome === '-' ? '支出' : '收入' }}{{ total }}笔,合计</span>
        <p class="consume">{{ billy }}</p>
      </div>
    </header>
        <div class="container">
            <Echart />
            <InfoList :date="date" />
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
import Echart from '@/components/statistics/Echart.vue';

@Component({
  components: {Echart, InfoList, Header}
})
export default class StaticHeader extends mixins(listDepository) {
  payOrIncome: string = '-';
  billyType: string = '月账单';
  date: string = dayjs().format('YYYY-MM');
  monthListObj: {list:[],date:string} = {
    list: this.records,
    date:  this.date
  };
  payOrIncomeSelectObj: {date:string,payOrIncome:string} = {
    date: this.date,
    payOrIncome: this.payOrIncome
  };

  init(){
    this.monthListObj.list = this.records;
    this.$store.commit('billyStore/reset');
    this.$store.commit('billyStore/MonthList', this.monthListObj);
    this.$store.commit('billyStore/payOrIncomeSelect', this.payOrIncomeSelectObj);
  }
  created() {
    this.init()
  }
  @Watch('payOrIncome')
  onPayOrIncome() {
    this.payOrIncomeSelectObj.payOrIncome = this.payOrIncome;
    this.init()
  }
  @Watch('date')
  onDate() {
    console.log(this.date);
    this.monthListObj.date = this.date;
    this.payOrIncomeSelectObj.date = this.date;
    this.init()
  }
  @Watch('billyType')
  onBillyType() {
    //todo
    //优化-使用展开运算符看看?

    this.$store.commit('billyStore/reset');
    let currentYear;
    let currentYearAllist: [] = [];
    let billy: number = 0;
    let total: number = 0;
    let date = dayjs(this.date).format('YYYY');
    if (this.billyType === '年账单') {
      // @ts-ignore
      let includeCurrentYear = this.records.filter(item =>
          dayjs(item.createAt).format('YYYY') === date
      );
      // @ts-ignore
      currentYear = includeCurrentYear.map(item => {
        return item.items;
      });
      for (let i = 0; i < currentYear.length; i++) {
        // @ts-ignore
        currentYearAllist = currentYear[i].map(item => {
          return item;
        }).concat(currentYearAllist);
      }
      total = currentYearAllist.length;
      currentYearAllist.forEach(item => {
        // @ts-ignore
        billy = billy + item.num;
      });
      this.$store.commit('billyStore/setBilly', {billy,total});
    }
    else{
      this.init()
    }
  }
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
  margin-top: -40px;
}
</style>

