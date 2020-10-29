<template>
  <div>
    <div class="header_nav">
      <span class="month date" @click="billC(true)" :class="{selected:selected}">月账单</span>
      <span class="year date" @click="billC(false)" :class="{selected:!selected}">年账单</span>
    </div>
    <div class="header_middle">
      <label for="start" class="header_input">
        <input type="month" id="start" name="start"
               :min="minDate" :value="value" ref="year_month"
               @change="selectDate"
        >
        <eva-icon name="chevron-down-outline" fill="#fff" class="icons"></eva-icon>
      </label>
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
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Header extends Vue {

  minDate: string = '2001-01';
  selected: boolean = true;
  povit: string = '-';
  value: string = dayjs().format('YYYY-MM');

  billC(bool:boolean) {
    this.selected = bool;
    this.$emit('update:billyType', this.selected ? '月账单' : '年账单');

  }

  selectDate(e:any) {
    this.value = e.target.value;
    this.$emit('update:date', dayjs(e.target.value).format('YYYY-MM'));
  }

  selectPayOrIncome(e:string) {
    this.povit = e;
    this.$emit('update:payOrIncome', e);
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
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
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
</style>