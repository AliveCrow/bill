<template>
  <div id="number_pad">
    <div class="number_btn pad_left">
      <div>1</div><div>2</div><div>3</div>
      <div>4</div><div>5</div><div>6</div>
      <div>7</div><div>8</div><div>9</div>
      <div class="zero">0</div><div class="dot">.</div>
    </div>
    <div class="number_btn pad_right">
      <div>删除</div>
      <div>清空</div>
      <div class="ok">=/ok</div>
    </div>

  </div>
</template>

<script lang='ts'>
export default {
  name: "numberPag"
}
</script>

<style scoped lang='scss'>
@import "public/css/var";
  #number_pad{
    display: flex;
    flex-direction: row;
    .number_btn{
      flex-grow: 1;
      div{
        height:70px;
        line-height: 70px;
        text-align: center;
        background-color: $navBgColor;
        border-top: 1px solid  $fontColor;
        border-right: 1px solid  $fontColor;
      }
    }
    .pad_left{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex-grow: 3;
      &>div{
        flex-basis: 33.333333%;
        flex-grow:1;
      }
      &>.zero{
        flex-grow: 300;
        text-align: center;
      }
      &>.dot{
        flex-grow: 1;
      }
    }
    .pad_right{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      >.ok{
        line-height: 140px;
        flex-grow: 2;
      }

    }
  }
</style>