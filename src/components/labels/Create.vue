<template>
  <box>
    <Icon idName="label" className="icon_label label"/>
    <label class="label_item_name">
      <input placeholder="创建新标签" type="text" v-model="text" class="label_item_input"/>
    </label>
    <Icon idName="create" className="icon_label edit" @click.native="create_tag" />
  </box>
</template>

<script lang='ts'>
import Vue from 'vue';
import box from '@/components/labels/box.vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {box},
})
export default class Label  extends Vue{

  text: string= ''

  create_tag(){
    this.$store.commit('tagsSetter',this.text)
    this.clearInput()
  }
  clearInput(){
    this.text = ''
  }


}
</script>

<style scoped lang='scss'>
@import 'public/css/var';
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
</style>