<template>
  <div id="money">
      <Layout className="layout_one">
        <div class="money_box">
          <NumberPad :value.sync="list.num" @submit="submit"/>
          <Types @exposeType="getType" :value="list.types"/>
          <label class="remark">
            <span>备注:</span>
            <input v-model="list.remark" type="text" placeholder="请在这里输入备注">
          </label>
          <Tag :tagsSource.sync="tags" @exposeTags="getTags" :selectedTags="list.tags"/>
        </div>
      </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import configList from '@/models/configList';
import tag from '@/models/configTag';

@Component({
  components: { Types, NumberPad}
})
export default class Money extends Vue {
  tags: string[] = tag.getter().map(item=>item.name)

  lists:TypeList[] = configList.getter()

  list: TypeList = {
    tags: [], remark: '', types: '-', num: 0, createAt: new Date
  };

  getTags(list: string[]) {
    this.list.tags = list;
  }

  getType(type: string) {
    this.list.types = type;
  }

  resetList(){
    this.list = {
      tags: [], remark: '', types: '-', num: 0, createAt: new Date
    };
  }

  submit() {
    if (this.list.num <= 0) {
      alert('请输入消费金额');
      return;
    }
    if (this.list.tags.length === 0) {
      this.list.tags = ['支出'];
    }
    const store= configList.clone(this.list);
    this.lists.push(store);
    this.resetList()
  }

  @Watch('lists')
  listsChange() {
    configList.setter(this.lists)
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
    span{
      width:4rem;
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