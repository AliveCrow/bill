<template>
  <div id="money">
    <Layout className="layout_one">
      <div class="money_box">
        <NumberPad :value.sync="recordListItem.num" @submit="submit"/>
        <Types @exposeType="getType" :value="recordListItem.types"/>
        <label class="remark">
          <span>备注:</span>
          <input v-model="recordListItem.remark" type="text" placeholder="请在这里输入备注">
        </label>
        <Tag @exposeTags="getTags" :selectedTags="recordListItem.tags"/>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import dayjs from 'dayjs';


//todo 标签只能选择一个,没选标签自动归类为支出,或者收入
//

@Component({
  components: {Types, NumberPad}
})

export default class Money extends Vue {
  // @ts-ignore
  $router;
  recordListItem: TypeList = {
    tags: [], remark: '', types: '-', num: 0, createAt: new Date
  };

  getTags(list: string[]) {
    this.recordListItem.tags = list;
  }

  getType(type: string) {
    this.recordListItem.types = type;
  }

  resetList() {
    this.recordListItem = {
      tags: [], remark: '', types: '-', num: 0, createAt:new Date
    };
  }

  submit() {
    if (this.recordListItem.num <= 0) {
      alert('请输入消费金额');
      return;
    }
    if (this.recordListItem.tags.length === 0) {
      this.recordListItem.tags = ['支出'];
    }
    this.$store.commit('recordStore/recordListSetter', this.recordListItem);
    this.resetList();
  }
}
</script>
<style scoped lang='scss'>
@import "../../public/css/var";

.money_box {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;

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