<template>
  <svg  :class="`icon ${className}`" aria-hidden="true" @click="clickIcon">
    <use :xlink:href="'#'+idName"/>
  </svg>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('@/assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

@Component
export default class Icon extends Vue {
  name = 'Icon';
  @Prop(String) idName!: string ;
  @Prop(String) className!: string | undefined;
  @Prop(Array) readonly tagsSource!: string[];


  clickIcon(){
    this.$emit('iconToggle')
  }

  create(){

  }
}
</script>

<style scoped lang='scss'>
</style>