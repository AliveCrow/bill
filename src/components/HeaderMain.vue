<template>
  <div id="header_main_app">
    <Header
        :billyType.sync="billyType"
        :payOrIncome.sync="payOrIncome"
        :date.sync="date"
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

@Component({
  name: 'HeaderMain',
  components: {Sum, Header}
})
export default class HeaderMain extends mixins(listDepository,) {
  payOrIncome = '-';
  billyType = '月账单';
  total = 0;
  billy = 0;
  date  ='';


  init() {
    this.total = this.num(this.setDate(this.date)('YYYY-MM'), this.payOrIncome).total;
    this.billy = this.num(this.setDate(this.date)('YYYY-MM'), this.payOrIncome).billy;
  }
  created() {
    this.init();
  }

  @Watch('primordialRecords')
  onprimordialRecords() {
    this.onBillyType();
  }

  @Watch('payOrIncome')
  onPayOrIncome() {
    this.init();
    this.onBillyType();
  }

  @Watch('date')
  onDate() {
    this.init();
    this.$store.commit('setDate', this.setDate(this.date)('YYYY-MM'));
    this.onBillyType()
  }

  @Watch('billyType')
  onBillyType() {
    const allYearPersent = {
      allYearTotal:0,
      InCome:0,
      pay:0
    }

    if(this.billyType === '月账单'){
      this.init();
    }else{
      this.total= 0;
      this.billy = 0;
      //今年的账单
      const toYearList = this.records.filter((item: { createAt: string | number | Date | dayjs.Dayjs | undefined }) =>
          dayjs(item.createAt).format('YYYY') === this.setDate(this.date)('YYYY')
      );
      // 算出收入和支出
      toYearList.forEach((item: { items: any[] }) => {
        item.items.forEach(item => {
          allYearPersent.allYearTotal = allYearPersent.allYearTotal+item.num
          if(item.types === '-'){
            allYearPersent.pay =  allYearPersent.pay + item.num
          }else {
            allYearPersent.InCome = allYearPersent.InCome + item.num
          }
          if(item.types === this.payOrIncome){
            this.billy = item.num + this.billy;
            this.total += 1;
            return
          }
        });
      });
    }
    this.$emit('update:billyType',this.billyType)
    this.$emit('update:allYearPersent',allYearPersent)
  }

}


</script>

<style scoped lang='scss'>
@import "../assets/scss/css/var";


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