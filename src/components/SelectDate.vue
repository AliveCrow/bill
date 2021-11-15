<template>
  <label for="start" class="header_input" :class="labelClass"  >
    <input type="month" id="start" name="start" :class="inputClass"
           :min="minDate" :value="val"
           @change="selectDate"
    >
    <eva-icon name="chevron-down-outline" fill="#fff" class="icons" :key="key1"  ></eva-icon>
  </label>
</template>

<script lang='ts'>
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';

@Component
export default class SelectDate extends mixins(listDepository) {
  @Prop(String) labelClass: string |undefined;
  @Prop(String) inputClass: string |undefined;
  @Prop(String) key1: string |undefined;

  minDate = '2001-01';
  val = '';

  created() {
    this.val = this.setDate('')('YYYY-MM')
  }

  selectDate(e: any) {
    this.$emit('update:date', this.setDate(e.target.value)('YYYY-MM'));
  }

}


</script>

<style scoped lang='scss'>
@import "../assets/scss/css/var";


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

.inputClass{
  line-height: 50px!important;
  &::-webkit-calendar-picker-indicator {
    background-image: none;
    color: #666;
    width: 100% !important;
    height: 50px;
    position: absolute;
    top: 0;
    left: -30px!important;
    outline: none;

  }
  &~.icons{
    position: absolute;
    top: 15px;
    right: 10px;
    pointer-events: none;
  }
}
</style>