<template>
  <label for="start" class="header_input">
    <input type="month" id="start" name="start"
           :min="minDate" :value="value" ref="year_month"
           @change="selectDate"
    >
    <eva-icon name="chevron-down-outline" fill="#fff" class="icons"></eva-icon>
  </label>
</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import dayjs from 'dayjs';

@Component
export default class SelectDate extends mixins(listDepository) {

  minDate: string = '2001-01';
  value: string = dayjs().format('YYYY-MM');


  selectDate(e: any) {
    this.value = e.target.value;
    this.$emit('update:date', dayjs(e.target.value).format('YYYY-MM'));
  }

}


</script>

<style scoped lang='scss'>
@import "public/css/var";


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

</style>