<template>
  <div id="money">
    <Message :type="msg_type" ref="msg" v-show="msg_show">
      {{ msg }}
    </Message>
    <Layout className="layout_one" ref="layout_one">
      <HeaderMain/>
      <div class="billy_box">
        <span class="title">月账单</span>
        <div class="info_box">
          <InfoList :date="date"/>
        </div>
      </div>
      <eva-icon name="edit-outline" fill="#3da75b" class="icons" animation="shake" height="100%"
                @click="showNumPad"></eva-icon>
    </Layout>
    <div class="money_box go_bottom" ref="NumPad">
      <eva-icon name="close-outline" fill="#3da75b" class="back" animation="shake" height="100%"
                @click="hideNumPad"></eva-icon>
      <NumberPad :value.sync="recordListItem.num" @submit="submit"/>
      <Types @exposeType="getType" :value="recordListItem.types"/>
      <div style="height: 53px;position: relative;">
        <label for="start" class="header_input">
          <input type="date" id="start" name="start"
                 min="2020-01-01" :value="value" ref="year_month"
                 @change="getDate"
          >
        </label>
      </div>
      <label class="remark">
        <span>备注:</span>
        <input v-model="recordListItem.remark" type="text" placeholder="请在这里输入备注">
      </label>
      <Tag @exposeTags="getTags" :selectedTags="recordListItem.tags"/>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import dayjs from 'dayjs';
import HeaderMain from '@/components/statistics/HeaderMain.vue';
import InfoList from '@/components/statistics/InfoList.vue';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import SelectDate from '@/components/statistics/SelectDate.vue';


//todo 标签只能选择一个,没选标签自动归类为支出,或者收入
//

@Component({
  components: {SelectDate, InfoList, HeaderMain, Types, NumberPad}
})

export default class Money extends mixins(listDepository) {
  // @ts-ignore
  $router;
  recordListItem: TypeList = {
    tags: [], remark: '', types: '-', num: 0, createAt:dayjs().format('YYYY-MM-DD')
  };
  el: Element | undefined;
  msg: string = '';
  msg_type: string = '';
  msg_show: boolean = false;
  value: string = dayjs().format('YYYY-MM-DD');


  date = this.$store.state.date;

  getTags(list: string[]) {
    this.recordListItem.tags = list;
  }
  getDate(e:string){
    // @ts-ignore
    this.value=e.target.value
    this.recordListItem.createAt = this.value;
  }

  getType(type: string) {
    this.recordListItem.types = type;
  }

  resetList() {
    this.recordListItem = {
      tags: [], remark: '', types: '-', num: 0, createAt: this.value
    };
  }

  showMsg(msg: string, msg_type: string) {
    this.msg_show = true;
    this.msg = msg;
    this.msg_type = msg_type;
    setTimeout(() => {
      this.msg_show = false;
    }, 800);
  }

  hideNumPad() {
    this.el = this.$refs.NumPad as Element;
    this.el.classList.add('go_bottom');
    this.el.classList.remove('go_top');
  }

  submit() {
    if (this.recordListItem.num <= 0) {
      this.showMsg('请输入金额', 'Danger');
      return;
    }
    if (this.recordListItem.tags.length === 0) {
      if (this.recordListItem.types === '-') {
        // @ts-ignore
        this.recordListItem.tags.push({name: '支出'});
      } else {
        // @ts-ignore
        this.recordListItem.tags.push({name: '收入'});
      }
    }
    this.$store.commit('recordStore/recordListSetter', this.recordListItem);
    this.resetList();
    this.showMsg('记录成功', 'Success');
    setTimeout(() => {
      this.msg_show = false;
      this.el = this.$refs.NumPad as Element;
      this.el.classList.add('go_bottom');
      this.el.classList.remove('go_top');
    }, 400);

  }


  showNumPad() {
    this.el = this.$refs.NumPad as Element;
    this.el.classList.remove('go_bottom');
    this.el.classList.add('go_top');
  }

}
</script>
<style scoped lang='scss'>
@import "../../public/css/var";

.icons {
  background-color: rgba($whiteColor, 1);
  box-shadow: 0 0 6px rgba(#000, .1);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  right: 20px;
  bottom: 120px;
  z-index: 10;
}

.billy_box {
  .title {
    display: block;
    margin: 10px;
    padding: 10px;
    font-size: 1.4rem;
  }

  .info_box {
    border-radius: 50px;
  }

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
  margin-top: -30px;
}

.go_top {
  transform: translateY(0);
  transition: all .5s ease .25s;
}

.go_bottom {
  transform: translateY(100%);
  transition: all .5s ease .25s;
}

.money_box {
  .back {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .header_input {
    input[type='date'] {
      height: 53px;
      border: none;
      outline: none;
      width: 100%;
      text-align: center;
      z-index: 101;
      font-family: $font-family;
      font-size: 1.2rem;
      background-color: rgba($navBgColor,.5);
      &::-webkit-calendar-picker-indicator {
        height: 100%;
        background-image: none;
        color: #666;
        position: absolute;
        width: 100%;
        outline: none;
      }
    }
  }
  z-index: 10;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #fff;
  padding-bottom: 63px;
  overflow: hidden;
  .remark {
    padding-left: 10px;
    line-height: 40px;
    text-align: left;
    font-size: 1.2rem;
    display: flex;
    align-items: center;

    span {
      width: 4rem;
    }

    input {
      padding: 0 8px;
      width: 100%;
      height: 2rem;
      outline: none;
      border: none;
      line-height: 40px;
      font-size: 1rem;
      color: rgba($fontColor, .6)
    }
  }

}

</style>