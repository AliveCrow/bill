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
          <InfoList :date="date" :key="uns2"/>
        </div>
      </div>
      <eva-icon name="edit-outline" fill="#3da75b" class="icons" animation="shake" height="100%"
                @click="showNumPad"></eva-icon>
    </Layout>
    <div class="money_box go go_bottom" ref="NumPad">
      <eva-icon name="close-outline" fill="#3da75b" class="back" animation="shake" height="100%"
                @click="hideNumPad"></eva-icon>
      <NumberPad :value.sync="recordListItem.num" @submit="submit" :key="uns1"/>
      <Types @exposeType="getType" :value="recordListItem.types"/>
      <div style="height: 53px;position: relative;">
        <label for="start" class="header_input">
          <input type="date" id="start" name="start"
                 min="2020-01-01" ref="year_day"
                 @change="setCreateDate"
          >
        </label>
      </div>
      <label class="remark">
        <span>备注:</span>
        <input v-model="recordListItem.remark" type="text" placeholder="请在这里输入备注">
      </label>
      <Tag :selectedTags.sync="recordListItem.tags" :key="uns3"/>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import dayjs from 'dayjs';
import HeaderMain from '@/components/HeaderMain.vue';
import InfoList from '@/components/money/InfoList.vue';
import SelectDate from '@/components/SelectDate.vue';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';

@Component({
  components: {SelectDate, InfoList, HeaderMain, Types, NumberPad}
})
export default class Money extends mixins(listDepository) {
  // @ts-ignore
  $router;
  el: Element | undefined;
  recordListItem: TypeList = {
    tags: [], remark: '', types: '-', num: 0, createAt: dayjs().format('YYYY-MM-DD')
  };
  date: string = dayjs().format('YYYY-MM-DD');
  list: string[] = [];
  uns1: number = 1;
  uns2: number = 2;
  uns3: number = 3;

  mounted() {
    // @ts-ignore
    this.$refs.year_day.value = dayjs().format('YYYY-MM-DD');
  }


  getTags(list: string[]) {
    this.recordListItem.tags = list;
  }

  //todo bug 新增后账单列表不会更新

  getType(type: string) {
    this.recordListItem.types = type;
  }

  setCreateDate(e: { target: { value: string; }; }) {
    this.recordListItem.createAt = e.target.value;
    // @ts-ignore
    this.$refs.year_day.value = e.target.value;
  }

  resetList() {
    this.recordListItem = {
      tags: [], remark: '', types: '-', num: 0, createAt: dayjs().format('YYYY-MM-DD')
    };
  }

  resetNumPad() {
    // @ts-ignore
    this.$refs.year_day.value = dayjs().format('YYYY-MM-DD');
    this.recordListItem.remark = '';
    this.uns1 = 100;
    this.uns3 = 300;
  }

  hideNumPad() {
    this.el = this.$refs.NumPad as Element;
    this.el.classList.add('go_bottom');
    this.el.classList.remove('go_top');
    setTimeout(() => {
      this.resetNumPad();
    }, 500);
  }

  showNumPad() {
    this.uns1 = 1;
    this.uns2 = 2;
    this.uns3 = 3;
    this.el = this.$refs.NumPad as Element;
    this.el.classList.remove('go_bottom');
    this.el.classList.add('go_top');
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
      this.hideNumPad();
      this.uns2 = 0;
    }, 400);

  }
}
</script>

<style scoped lang='scss'>
@import "../../public/css/var";
.icons {
  background-color: rgba($whiteColor, 1);
  box-shadow: 0 0 10px rgba(#000, .2);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 10;
}

.billy_box {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
  margin-top: -30px;

  .title {
    display: block;
    margin: 10px;
    padding: 10px;
    font-size: 1.4rem;
  }
}

.go {
  transition: all .5s ease .25s;
}

.go_top {
  transform: translateY(0);
}

.go_bottom {
  transform: translateY(100%);
}

.money_box {
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
      background-color: rgba($navBgColor, .5);

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