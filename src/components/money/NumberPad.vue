<template>
  <div id="number_pad">
    <div class="number">
      {{ insert }}
    </div>
    <div class="pad">
      <div class="number_btn pad_left">
        <div @click="insertNum" ref="pad_btn" class="num" v-for="(num,index) in numData" :key="index">
            {{num}}
        </div>
      </div>
      <div class="number_btn pad_right" ref="pad_btn_right">
        <div  @click="del">Delete</div>
        <div  @click="clear">AC</div>
        <div  class="ok" @click="confirm">记一笔</div>
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
  // @Prop(Number) value!: number;

  numData = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
  ];
  insert = '0'

  insertNum(event: MouseEvent) {
    if (event.target) {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent!.trim();
      if (this.insert.length >= 16) {
        //弹出提示框
        return;
      }
      if (this.insert === "0") {
        // @ts-ignore
        if (/^[0-9]\d*$/.test(parseInt(input))) {
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

  addAni(arr: any[]){
    arr.forEach((item: { addEventListener: (arg0: string, arg1: { (e: any): void; (e: any): void; }) => void; })=>{
      item.addEventListener('touchstart',function (e: any){
        // @ts-ignore
        this.style.backgroundColor = 'rgba(238,238,238,.8)'
      })
      item.addEventListener('touchend',function (e: any){
        // @ts-ignore
        this.style.backgroundColor = 'rgba(238,238,238,.4)'
      })
    })
  }


  mounted(){
    // @ts-ignore
    this.addAni(this.$refs.pad_btn);
    // @ts-ignore
    this.$refs.pad_btn_right.children.forEach(item=>{
          item.addEventListener('touchstart',function (e: any){
            // @ts-ignore
            this.style.opacity = '.8'
          })
          item.addEventListener('touchend',function (e: any){
            // @ts-ignore
            this.style.opacity = '1'
          })
        })
  }

}
</script>

<style scoped lang='scss'>
@import "../../assets/scss/css/var";

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
      display: flex;
      div {
        border-radius: 3px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        background-color: rgba($navBgColor,.4);
      }
    }

    .pad_left {
      flex-direction: row;
      flex-wrap: wrap;
      flex-grow: 3;
      >.num{
        font-size: 1.2rem;
        flex-grow: 1;
        flex-basis: 30%;
        margin: 0 0 5px 5px;
        &:focus{
          background-color: red;
        }
      }
    }

    .pad_right {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      div{
        &:nth-child(1){
          background-color: rgba($Danger,.8);
        }
        &:nth-child(2){
          background-color: rgba($Waring,.8);
        }
        color: #fff;
        background-color: rgba($selectedColor,.9);
        margin: 0 5px 5px 5px;
      }
      > .ok {
        line-height: 140px;
        flex-grow: 2;
      }

    }
  }
}

</style>