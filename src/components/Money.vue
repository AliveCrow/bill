<template>
  <div id="money">
    <Layout className="layout_one">
      <div class="money_box">
        <NumberPad/>
        <Tag :tagsSource.sync="tags" />
      </div>
    </Layout>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import numberPag from '@/components/money/numberPag.vue';
import {Component} from 'vue-property-decorator';

@Component({
  components:{'NumberPad': numberPag}
})
export default class Money extends Vue {
  tags: string[] =  [
    '衣', '食', '住', '行', 'sd'
  ]
}
</script>
<style scoped lang='scss'>
@import "public/css/var";

.money_box {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;

}
</style>