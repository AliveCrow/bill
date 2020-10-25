<template>
  <div id="money">
    <Layout className="layout_one">
      <div class="money_box">
        <NumberPad/>
        <div class="number">
          123
        </div>
        <Types/>
        <label class="remake">
          备注:
          <input type="text" placeholder="请在这里输入备注">
        </label>
        <div class="tags">
          <div class="tags_box">
            <Tag >1</Tag><Tag >1</Tag><Tag >1</Tag><Tag >1</Tag>
            <Tag >1</Tag><Tag >1</Tag><Tag >1</Tag><Tag >1</Tag>
          </div>
          <Tag add="addTag">
            <input type="text" class="add_tag" placeholder="新增标签">
          </Tag>
        </div>
      </div>
    </Layout>

  </div>
</template>

<script lang='ts'>
import numberPag from "@/components/money/numberPag.vue";
import Types from "@/components/money/Types.vue";

export default {
  name: "money",
  components: {
    'NumberPad': numberPag,
    'Types':Types,
  }
}
</script>


<style lang="scss">
.layout_one {
}
.addTag{
  order:-1;
}

</style>
<style scoped lang='scss'>
@import "public/css/var";
#money {

}

.money_box {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  .number{
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
  .tags{
    text-align: left;
    padding:0 20px;
    overflow-y: auto;
    .tags_box{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

  }
  .add_tag{
    background-color: transparent;
    height: 2rem;
    outline: none;
    border: none;
    line-height: 40px;
    font-size: 1rem;
    color: rgba($whiteColor,1);
    width:100px;
    padding:0 10px;
    text-align: center;
  }
}
</style>