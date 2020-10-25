<template>
  <ul>
    <li :class="value==='-'?'selected':'' " @click="selectType('-')">支出</li>
    <li :class="value==='+'?'selected':'' " @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';


@Component
export default class Types extends Vue {
  @Prop(String) value: string | undefined;
  type = this.value

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
    this.$emit('exposeType', this.type);
  }
}
</script>

<style scoped lang='scss'>
@import "public/css/var";

ul {
  display: flex;

  li {
    flex-grow: 1;
    padding: 10px 20px;
    font-size: 1.4rem;
    background-color: $navBgColor;
  }

  .selected {
    color: $selectedColor;
    border-bottom: 3px solid $selectedColor;
  }
}
</style>