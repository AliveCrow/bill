<template>
  <div  id="msg_app" :style="`background-color:`+color[type]">
      <span>
        <slot></slot>
      </span>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Message',
  props:['type'],
  data(){
    return {
      color:{
        Waring:'#E6A23C',
        Success:'#67C23A',
        Danger:'#F56C6C',
        Info:'#909399',
      }
    }
  }

};
</script>

<style scoped lang='scss'>
#msg_app{
  padding: 5px 20px;
  border-radius: 3px;
  color: #fff;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 9999;
}
</style>