<template>
  <div>
    <div class="header_nav">
      <span class="month date" @click="billC(true)" :class="{selected:selected}">月账单</span>
      <span class="year date" @click="billC(false)" :class="{selected:!selected}">年账单</span>
    </div>
    <div class="header_middle">
      <SelectDate :date.sync = 'date'  />
      <div class="header_middle_select">
        <span :class="{selected:povit==='-'}" @click="selectPayOrIncome('-')">支出</span>
        <span :class="{selected:povit ==='+'}" @click="selectPayOrIncome('+')">收入</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
// minDate: string = '2020-01';
import Vue from 'vue';
import dayjs from 'dayjs';
import {Component, Prop, Watch} from 'vue-property-decorator';
import SelectDate from '@/components/statistics/SelectDate.vue';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
@Component({
  components: {SelectDate}
})
export default class Header extends mixins(listDepository) {
  selected: boolean = true;
  povit: string = '-';
  date: string = dayjs().format('YYYY-MM');

  billC(bool:boolean) {
    this.selected = bool;
    this.$emit('update:billyType', this.selected ? '月账单' : '年账单');

  }

  selectPayOrIncome(e:string) {
    this.povit = e;
    this.$emit('update:payOrIncome', e);
  }

  created(){
  }

  @Watch('date')
  onDate(){
    this.$emit('update:date',this.date)
  }



};
</script>

<style scoped lang='scss'>
@import "public/css/var";

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

}


</style>