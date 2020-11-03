<template>
  <div>
    <Message :type="msg_type" ref="msg" v-show="msg_show">
      {{ msg }}
    </Message>
      <div class="modify" >
        修改标签
      </div>
      <Create  :isError.sync="isError"/>
      <div style="overflow:auto;height: 100%;padding-bottom: 60px">
        <transition-group name="list" tag="p">
          <ListItem v-for="(tag,index) in tags" :tag="tag.name" :index="index" :key="tag.id"/>
        </transition-group>
      </div>

  </div>
</template>

<script lang='ts'>
import {Component, Watch} from 'vue-property-decorator';
import Create from '@/components/labels/Create.vue';
import ListItem from '@/components/labels/ListItem.vue';
import listDepository from '@/mixins/listDepository';
import {mixins} from 'vue-class-component';

@Component({
  components: {ListItem, Create}
})
export default class Label extends mixins(listDepository) {
  input: any;
  edit: any;
  isError: boolean = false;
  msg_show: boolean = false;

  mounted() {
    this.input = document.querySelectorAll('.tag_input');
    this.edit = document.querySelectorAll('.edit');
    window.onresize = ()=>{
      return(()=>{
        this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.$emit('update:showHeight',this.showHeight)
      })()
    }
  }

  @Watch('isError')
  onch() {
    if (this.isError) {
      this.showMsg('标签创建失败,请检查是否有重名标签并且不能为空', 'Danger');
      setTimeout(() => {
        this.msg_show = false;
        this.isError = false;
      }, 1500);
    }
  }

}


</script>

<style scoped lang='scss'>
@import '../assets/scss/css/var';

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all .35s ease .1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.modify {
  font-size: 1.4rem;
  color: $whiteColor;
  padding: 10px;
  background-color: $headerColor;
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

      &:hover {
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

</style>