<template>
  <box class="box">
    <svg class="icon icon_label" aria-hidden="true" @click="delete_tag">
      <use :xlink:href="'#'+idName[0]"/>
    </svg>
    <label class="label_item_name">
      <input type="text" :value="tagName" @focus="change" class="label_item_input tag_input"/>
    </label>
    <svg class="icon icon_label icon_target" ref="icon_target" aria-hidden="true" @click="change_id">
      <use :xlink:href="'#'+idName[1]"/>
    </svg>
  </box>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import box from '@/components/labels/box.vue';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';


@Component({
  components: {box}
})
export default class ListItem extends mixins(listDepository) {
  @Prop(String) tag!: string;
  @Prop(Number) index!: number;

  tagName: string = this.tag;
  idName: string[] = ['label', 'edit'];
  input: any;

  cancelF() {
    this.input.forEach(item => {
      item.blur();
    });
  }


  change(e) {
    this.idName = ['delete', 'confirm'];
    const thisEl = this.input[this.index];
    thisEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        thisEl.blur();
        this.change_tag();
        this.idName = ['label', 'edit'];
      }
    });
    return;
  }

  change_tag() {
    this.tagName = this.input[this.index].value;
    const argus = {index: this.index, tagName: this.tagName};
    this.$store.commit('tagsStore/tagsUpdate', argus);
    this.tagName = this.$store.state.tagsStore.tagsDataSource[this.index].name
  }

  change_id() {
    if (this.idName[1] === 'edit') {
      this.input[this.index].select()
      this.idName = ['delete', 'confirm'];
    } else {
      this.change_tag();
      this.idName = ['label', 'edit'];
    }

  }


  delete_tag() {
    if (this.idName[0] === 'delete') {
      this.$store.commit('tagsStore/tagsRemoved', this.index);
    }
  }

  created() {

  }

  mounted() {
    this.input = document.querySelectorAll('.tag_input');
  }

}
</script>

<style scoped lang='scss'>
@import '../../assets/scss/css/var';

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