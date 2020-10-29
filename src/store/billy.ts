import dayjs from 'dayjs';

type storeBilly = {
    toMonthList: string[]; //选择月的总列表
    total: number;       //选择月的总支出笔数
    billy: number;    //总支出
}

const state:storeBilly = {
    toMonthList: [], //选择月的总列表
    total: 0,    //选择月的总支出笔数
    billy: 0  //总支出
}


const billyStore = {
    namespaced: true,
    state,
    mutations: {
        reset(state:storeBilly) {
            state.billy = 0;
            state.total = 0;
        },
        MonthList(state:storeBilly, obj:{list:[],date:string}) {
            state.toMonthList =  obj.list
                .filter((item: { createAt: string }) =>
                    dayjs(item.createAt).format('YYYY-MM') === obj.date
                );
        },
        payOrIncomeSelect(state:storeBilly,obj:{date:string,payOrIncome:string}) {
            if (state.toMonthList.length === 0) {
                // @ts-ignore
                state.billy = 0;
                state.total = 0;
                return;
            } else {
                // @ts-ignore
                let midArr = []
                state.toMonthList.forEach(res=>{
                     let x = res.items.filter((item: { createAt: string | number | Date | dayjs.Dayjs | undefined; types: string; }) =>
                        dayjs(item.createAt).format('YYYY-MM') === obj.date
                        &&
                        item.types === obj.payOrIncome
                    )
                    midArr.push(x)
                })
                let monthPayOrIncomeList =[]
                midArr.forEach(res=>{
                    res.forEach(item=>{
                        monthPayOrIncomeList.push(item)
                    })
                })

                state.total = monthPayOrIncomeList.length;
                monthPayOrIncomeList.forEach((item: { num: number; }) => {
                    state.billy = state.billy + item.num;
                });
            }
        },
        setBilly(state:storeBilly,obj:{billy:number,total:number}){
            state.billy = obj.billy,
            state.total = obj.total
        }
    },
    action: {},
    getters: {}
};

export default billyStore;