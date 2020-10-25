<template>
  <div id="number_pad">
    <div class="number">
      {{ insert }}
    </div>
    <div class="pad">
      <div class="number_btn pad_left">
        <div @click="insertNum" class="num" v-for="(num,index) in numData" :key="index">{{ num }}</div>
      </div>
      <div class="number_btn pad_right">
        <div @click="del">删除</div>
        <div @click="clear">清空</div>
        <div class="ok" @click="confirm">/ok</div>
      </div>
    </div>
  </div>


</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';

@Component({
  components: {Types}
})
export default class numberPag extends Vue {
  @Prop(Number) value!: number;
  numData = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
  ];
  insert = this.value.toString()

  insertNum(event: MouseEvent) {
    if (event.target) {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent!;
      if (this.insert.length >= 16) {
        //弹出提示框
        return;
      }
      if (this.insert === "0") {
        if (/^[0-9]\d*$/.test(input)) {
          this.insert = input;
        } else {
          this.insert += input;
        }
        return;
      }
      if (this.insert.indexOf('.') >= 0 && input === '.') {
        return;
      }
      this.insert += input;
    }
  }

  del() {
    // console.log(this.insert.slice(1, -1));
    if (this.insert.length === 1) {
      this.insert = '0';
    } else {
      this.insert = this.insert.slice(0, -1);
    }

  }

  clear() {
    this.insert = '0';
  }

  confirm() {
    this.$emit('update:value', parseFloat(this.insert));
    this.$emit('submit');
    this.insert = '0';
  }

}
</script>

<style scoped lang='scss'>
@import "../../../public/css/var";

#number_pad {
  display: flex;
  flex-direction: column;

  .number {
    height: 70px;
    line-height: 70px;
    text-align: right;
    padding: 5px 10px;
    font-size: 2.4em;
  }

  .pad {
    display: flex;
    flex-direction: row;

    .number_btn {
      flex-grow: 1;

      div {
        height: 70px;
        line-height: 70px;
        text-align: center;
        background-color: $navBgColor;
        border-top: 1px solid $fontColor;
        border-right: 1px solid $fontColor;
      }
    }

    .pad_left {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex-grow: 3;

      & > div {
        flex-basis: 33.333333%;
        flex-grow: 1;
      }

      .num:nth-last-child(2) {
        flex-grow: 9999;
        text-align: center;
      }

      .num:nth-last-child(1) {
        flex-grow: 1;
      }
    }

    .pad_right {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      > .ok {
        line-height: 140px;
        flex-grow: 2;
      }

    }
  }
}

</style>