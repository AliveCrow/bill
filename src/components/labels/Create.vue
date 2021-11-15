<template>
  <box>

    <Icon idName="label" className="icon_label label"/>
    <label class="label_item_name" >
      <input placeholder="创建新标签" type="text" v-model="text" class="label_item_input"/>
    </label>
    <Icon idName="create" className="icon_label edit" @click.native="create_tag" />
  </box>
</template>

<script lang='ts'>
import box from '@/components/labels/box.vue';
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';

@Component({
  components: {box,},
})
export default class Label  extends mixins(listDepository){
  text= ''


  create_tag() {
    if(this.checkTag(this.text)){
      this.$store.commit('tagsStore/tagsSetter', this.text);
    }else {
      this.$emit('update:isError',true)
    }

    this.clearInput()
  }
  clearInput(){
    this.text = ''
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