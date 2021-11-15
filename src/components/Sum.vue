<template>
  <div class="header_bottom">
    <span>共{{ payOrIncome === '-' ? '支出' : '收入' }}{{ total }}笔,合计</span>
    <transition name="toggle_ani">

    <p class="consume" :key="billy">{{ billy }}</p>
    </transition>
  </div>
</template>

<script lang='ts'>

import Vue from 'vue'
import {Component, Prop, PropSync, Watch} from 'vue-property-decorator';

@Component
export default class Sum extends Vue{

  @PropSync('payOrIncome', { type: String }) syncedpayOrIncome: string | undefined;
  @PropSync('total', { type: Number }) syncedtotal: number | undefined;
  @PropSync('billy', { type: Number }) syncedbilly: number | undefined;

}


</script>

<style scoped lang='scss'>

.toggle_ani-enter-active,
.toggle_ani-leave-active {
  transition: opacity .2s ease;
}

.toggle_ani-enter,
.toggle_ani-leave-active {
  opacity: 0;
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
</style>