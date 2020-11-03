<template>
  <div class="tags" ref="tags">
    <div class="tags_box">
      <transition-group name="list" tag="p">
        <div v-for="(item,index) in tags" @click="toggle(item);"
             class="tag" :class="{selected:selectedTags.indexOf(item)>=0}"
             :name="item" :key="index" style="display: inline-block"
        >
  <span>
    {{ item.name }}
  </span>
        </div>
      </transition-group>
      <Icon @iconToggle="create" className="tag add" idName="add"/>
    </div>
  </div>

</template>

<script lang='ts'>
import Icon from '@/components/Icon.vue';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';


@Component({
  components: {'Icon': Icon}
})
export default class Tag extends mixins(listDepository) {
  @Prop(Array) readonly tagsSource!: string[];
  @Prop(Array) readonly selectedTags!: string[];


  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (this.selectedTags.length !== 0 && index < 0) {
      this.showMsg('只能选择一个标签', 'Waring');
    } else {
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    }
    this.$emit('update:selectedTags', this.selectedTags);
  }


  create() {
    let text = prompt('请输入要添加的标签名称') as string
    if(text==null){
      return
    }
    else if(text){
      if(this.checkTag(text)){
        this.$store.commit('tagsStore/tagsSetter', text);
      }else {
        this.$emit('update:isError',true)
      }
    }
    else{
      //“取消”事件
      return
    }

  }

}
</script>

<style scoped lang='scss'>
@import "../../assets/scss/css/var";

.list-enter-active, .list-leave-active {
  transition: all .35s ease .1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.tags {
  text-align: left;
  padding: 0 20px;
  overflow-y: auto;

  .tags_box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .tag {
      color: $whiteColor;
      background-color: $fontColor;
      border-radius: 3px;
      padding: 1px 5px;
      margin: 5px;
    }

    .selected {
      background-color: $selectedColor;
    }

    .add {
      height: 26px;
      width: 26px;
    }
  }

}
</style>