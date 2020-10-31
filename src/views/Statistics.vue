<template>
  <div>
    <Layout>
      <HeaderMain  />
      <div  class="billy_box">
          <StaticHeader  />
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
@import "public/css/var";

.billy_box{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
  margin-top: -30px;
}

</style>