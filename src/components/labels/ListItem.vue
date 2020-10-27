<template>
  <box class="box">
    <svg class="icon icon_label" aria-hidden="true" @click="delete_tag">
      <use :xlink:href="'#'+idName[0]"/>
    </svg>
    <label class="label_item_name">
      <input type="text" :value="tagName" @input="inputValue" class="label_item_input tag_input"/>
    </label>
    <svg class="icon icon_label icon_target" aria-hidden="true" @click="change_id">
      <use :xlink:href="'#'+idName[1]"/>
    </svg>
  </box>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import box from '@/components/labels/box.vue';


@Component({
  components: {box}
})
export default class ListItem extends Vue {
  @Prop(String) tag!: string;
  @Prop(Number) index!: number;
  tagName: string = this.tag;
  idName: string[] = ['label', 'edit'];
  input: any;


  change_id() {
    if (this.idName[1] === 'edit') {
      this.input[this.index].select();
      this.idName = ['delete', 'confirm'];
    } else {
      let argus = {index: this.index, tagName: this.tagName};
      let result = this.$store.commit('tagsUpdate', argus);
      if (result === 'fail') {
        this.tagName = this.tag;
      }
      this.idName = ['label', 'edit'];
    }
  }

  inputValue(event: KeyboardEvent) {
    // @ts-ignore
    this.tagName = event.target.value;
  }

  delete_tag() {
    if (this.idName[0] === 'delete') {
      this.$store.commit('tagsRemoved', this.index);
    }
  }

  created() {

  }

  mounted() {
    this.input = document.querySelectorAll('.tag_input');
    this.input[this.index].addEventListener('focus', () => {
      this.idName = ['delete', 'confirm'];
    });
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
</style>