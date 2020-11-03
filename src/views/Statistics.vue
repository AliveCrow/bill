<template>
  <div>
    <Layout  key="1010101010" >
      <HeaderMain key="1201"  />
      <div key="1202"  class="billy_box" style="padding-bottom: 100px">
          <StaticHeader   />
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Types from '@/components/money/Types.vue';
import StaticHeader from '@/components/statistics/StaticHeader.vue';
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'statistics',
  components: {
    HeaderMain,
    StaticHeader,
    Types,
  },
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/css/var";

.billy_box{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
  margin-top: -30px;
}

</style>