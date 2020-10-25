<template>
  <div class="tags">
    <div class="tags_box">
      <div v-for="(item,index) in tagsSource" @click="toggle(item);"
           class="tag" :class="{selected:selectedTags.indexOf(item)>=0}"
           :name="item" :key="index"
      >
  <span>
    {{ item }}
  </span>
      </div>
      <Icon @iconToggle="create" className="tag add" idName="add"/>
    </div>
  </div>

</template>

<script lang='ts'>
import Icon from '@/components/Icon.vue';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component({
  components: {'Icon': Icon}
})
export default class Tag extends Vue {
  @Prop(Array) readonly tagsSource!: string[];
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
  create() {
    const text = prompt('请输入要添加的标签名称');
    if (text) {
      this.$emit('update:tagsSource', [...this.tagsSource, text]);
    } else {
      return;
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../../public/css/var";

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