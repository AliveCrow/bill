<template>
  <div id="number_pad">
    <label class="remake">
      备注:
      <input @input="getRemake" v-model="remake" type="text" placeholder="请在这里输入备注">
    </label>
    <Types :numberA="+insert" />
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
        <div class="ok">=/ok</div>
      </div>
    </div>
  </div>


</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from "@/components/money/Types.vue";
@Component({
  components: {Types}
})
export default class numberPag extends Vue {

  numData = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
  ];

  insert = '0';
  remake = ''

  insertNum(event: MouseEvent) {
    if (event.target) {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent!;
      if (this.insert.length >= 16) {
        //弹出提示框
        return;
      }
      if (this.insert === '0') {
        if (/^[0-9]\d*$/.test(input)) {
          this.insert = input;
        }else {
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
      this.insert = '0'
    } else {
      this.insert = this.insert.slice(0, -1);
    }

  }
  clear() {
    this.insert = '0';
  }
  confirm(){

  }
  getRemake(event: KeyboardEvent){
    const text = this.remake
    console.log(
        text
    );
  }
  setTag(){
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
  .remake{
    padding-left: 10px;
    line-height: 40px;
    text-align: left;
    font-size: 1.2rem;
    input{
      height: 2rem;
      outline: none;
      border:none;
      line-height: 40px;
      font-size: 1rem;
      color: rgba($fontColor,.6)
    }
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