<template>
  <div>
    <Layout className="label_page">
      <div class="modify">
        修改标签
      </div>
      <div class="labels_box">
<!--        创建新标签-->
        <Create />
        <ListItem  v-for="(tag,index) in tags" :tag="tag.name" :index="index" :key="tag.id" />
      </div>

    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import confiTag from '@/models/configTag.ts'
import Create from '@/components/labels/Create.vue';
import ListItem from '@/components/labels/ListItem.vue';
import tag from '@/models/configTag.ts';
@Component({
  components: {ListItem, Create}
})
export default class Label extends Vue {
  input:any;edit:any;
  tags = tag.getter()

  created(){
    console.log(this.tags);
  }

  mounted(){
    this.input = document.querySelectorAll('.tag_input')
    this.edit = document.querySelectorAll('.edit')
    console.log(this.edit);
  }

}


</script>

<style scoped lang='scss'>
@import 'public/css/var';

.label_page {
  .modify {
    font-size: 1.4rem;
    color: $fontColor;
    padding: 10px;
    background-color: $navBgColor;
    margin-bottom: 10px;
  }

  .labels_box {
    .label_item {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      padding: 3px;
      text-align: left;

      .icon {
        padding: 0 8px;
        height: 38px;
        width: 38px;
        border-radius: 50%;
        &:hover{
          background-color: $navBgColor;
        }
      }

      .label_item_name {
        flex-grow: 1;
        position: relative;

        input {
          padding: 0 5px;
          border: none;
          border-bottom: 2px solid transparent;
          outline: none;
          height: 100%;
          width: 100%;
          font-size: 1rem;

          &:focus {
            border-bottom: 2px solid $navBgColor;
          }
        }
      }
    }
  }
}

</style>