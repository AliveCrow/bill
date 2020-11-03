<template>
  <div class="money_app"   >
    <div id="content" style="padding-bottom: 70px;">
      <div class="main" :class="className" ref="Layout">
        <div class="main_slot" :style="{height:h+'px'}">
            <slot ></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang='js'>
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  components: {HeaderMain},
  props: ['className','height'],
  name: 'Layout',
  data(){
    return {
      h:0,
    }
  },
  created() {
    this.h = document.body.clientHeight;
  }
};
</script>

<style scoped lang='scss'>



.money_app {
  #content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;

    .main {
      .main_slot {
        background-color: #fff;
        position: relative;

      }
      overflow-y: auto;
      height: 100%;
    }

  }
}


</style>