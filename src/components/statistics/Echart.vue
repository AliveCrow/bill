<template>
  <div class="app">
    <div class="top">
      <span>{{ name }}</span>
      <div>
        <button :class="{selected:selected}" @click="change(true)">支出</button>
        <button :class="{selected:!selected}" @click="change(false)">收入</button>
      </div>
    </div>
    <div class="echarts" v-if="eChartsType==='line'?(lineData.length!==0 && lineSum!==0) :newArr.length!==0" :key="key1">
      <div id="main" ref="container" style="width: 100%;height:480px">
      </div>
    </div>
    <div v-else style="width: 100%;height:480px;line-height: 480px" :key="key2" >
      <div ref="container">
        {{replaceWith}}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from 'dayjs';
import eChart from 'echarts/lib/echarts'
import SelectDate from '@/components/SelectDate.vue';


@Component({
  components: {SelectDate}
})
export default class myEchart extends mixins(listDepository) {
  @Prop(String) name: string | undefined;
  @Prop(String) eChartsType: string | undefined;
  @Prop(String) replaceWith: string | undefined;
  @Prop(String) month: string | undefined;
  @Prop(String) day: string | undefined;

  key1 = 11;
  key2 = 12; //没有数据变更就不会刷新

  selected = true;
  //pie
  tagsToday: any[] = []; //今天里产生的标签
  billyToday: any[] = []; //今天内产生的账单
  newArr: any[] = [];   //echarts数据
  //line
  lineData: any[] = [];
  lineSum = 0;
  color = ''

  change(bool: boolean) {
    this.selected = bool;
  }

  //pie
  getTagsToday(selected: boolean) {
    this.tagsToday = [];
    const type = selected ? '-' : '+';
    // 找出今天一天所有消费里的标签
    this.primordialRecords
        .filter((item: { createAt: string | number | Date | dayjs.Dayjs | undefined; types: string }) =>
            dayjs(item.createAt).format('YYYY-MM-DD') === dayjs(this.day).format('YYYY-MM-DD') && item.types === type
        ).forEach((item1: { tags: any }) => {
          item1.tags
              .forEach((res: { name: string }) => {
                if (this.tagsToday.indexOf(res.name) === -1) {
                  this.tagsToday.push(res.name);
                }
              });
        });
  }
  getBillyToday(selected: boolean) {
    const type = selected ? '-' : '+';
    // 今天的账单
    this.billyToday = this.primordialRecords.filter((item: { createAt: string | number | Date | dayjs.Dayjs | undefined; tags: any[]; types: string }) =>
        dayjs(item.createAt).format('YYYY-MM-DD') === dayjs(this.day).format('YYYY-MM-DD')
        && this.tagsToday.indexOf(item.tags[0])
        && item.types === type
    );
  }
  getEchartData() {
    this.newArr = this.tagsToday.map(item => {
      return {
        value: 0, name: item
      };
    });
    for (let i = 0; i < this.billyToday.length; i++) {
      const cur = this.billyToday[i];
      for (let j = 0; j < this.newArr.length; j++) {
        if (this.newArr[j].name === cur.tags[0].name) {
           this.newArr[j].value = this.newArr[j].value + cur.num;
        }
      }
    }
  }


  //line
  getLineData(selected: boolean){
    const type = selected ? '-' : '+';
    this.color = selected ? '#F56C6C' : '#67C23A';
    this.lineData = []
   const a =  this.records.filter((item: { createAt: string | number | Date | dayjs.Dayjs | undefined })=>
    dayjs(item.createAt).format('YYYY-MM') === this.setDate(this.getDate)('YYYY-MM')
  )
    a.forEach((item: { items: { types: string;num: number }[]; createAt: any })=>{
      let sum = 0
      item.items.forEach(item=>{
        if(item.types === type){
          sum = sum + item.num
          return
        }
      })
      this.lineData.push({date:item.createAt,value:sum})
      this.lineSum = sum
    })
  }

  //重新获取echart数据
  reGetPie(){
    this.getTagsToday(this.selected);
    this.getBillyToday(this.selected);
    this.getEchartData();
  }


  drawChart() {
    if((this.eChartsType === 'line' || this.eChartsType === 'pie') && (this.lineData.length !== 0 || this.newArr.length !== 0)){
      // @ts-ignore
      const myChart= eChart.init(this.$refs.container);
      let option ;
      if (this.eChartsType === 'line') {
        option = {
          color:this.color,
          title: {
            text: dayjs(this.month).format('YYYY-MM') + '月',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b}日<br/>{c}'
          },
          xAxis: {
            type: 'category',
            data: this.lineData.map(item=>dayjs(item.date).format('DD')).reverse(),
            nameLocation : 'end',
            splitNumber:3,
            // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            show: false
          },
          legend: {
            padding: [10, 10]
          },
          series: [{
            data: this.lineData.map(item => item.value).reverse() ,
            // [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        };
      } else if (this.eChartsType === 'pie') {
        option = {
          color: [
            '#4ea397',
            '#7bd9a5',
            '#f2b3c9',
            '#d0648a',
            '#22c3aa',
            '#f58db2'

          ],
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br>{c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            left: 'left',
            data: this.newArr,
            padding: [20, 30]
          },
          series: [
            {
              name: '消费',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.newArr,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
      //@ts-ignore
      myChart.setOption(option);
    }
  }


  mounted() {
    if(this.eChartsType === 'line'){
      this.getLineData(this.selected)

    }else {
     this.reGetPie()
    }
    this.drawChart();

  }
  updated(){
    this.drawChart();
  }

  @Watch('selected')
  onSelected() {
    if(this.eChartsType ==='pie'){
      this.reGetPie()
    }else {
      this.getLineData(this.selected)
    }
    this.drawChart();
  }

  @Watch('month')
  onMonth(){
    this.getLineData(this.selected)
    this.drawChart();
    console.log(this.lineData);
  }
  @Watch('day')
  onDay(){
    this.newArr =[]
    this.reGetPie()
    this.drawChart();
  }

}
</script>

<style scoped lang='scss'>
@import "../../assets/scss/css/var";

.app {
  //background-color: rgba($selectedColor,.9);
  //padding: 20px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: block;
      //margin: 20px;
      padding: 20px;
    }

    button {
      border: none;
      margin-right: 20px;
      padding: 5px 10px;
      border-radius: 3px;
      color: rgba(#000, .3);
      outline: none;
    }

    .selected {
      color: $selectedColor;
      background-color: rgba($selectedColor, .2);
    }
  }

  .echarts {
  }


}

</style>