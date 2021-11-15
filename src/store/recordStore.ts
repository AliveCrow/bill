import clone from '@/lib/clone';
import dayjs from 'dayjs';

require('dayjs/locale/zh-cn');


type storeRecord = {
    recordListsName: string;
    recordLists: TypeList[];
}

const state: storeRecord = {
    recordListsName: 'recordLists',
    recordLists: []
};

const recordStore = {
    namespaced: true,
    state,
    mutations: {
        //recordList
        recordListgetter(state: storeRecord) {
            state.recordLists = JSON.parse(localStorage.getItem(state.recordListsName) || '[]');
        },
        recordListSetter(state: storeRecord, list: TypeList) {
            const recoedClone = clone(list);
            state.recordLists.push(recoedClone);
            localStorage.setItem(state.recordListsName, JSON.stringify(state.recordLists));
        }
    },
    actions: {},
    getters: {
        extracting(state: storeRecord) {
            return state.recordLists.map(item => ({
                'createAt': dayjs(item.createAt).format('YYYY-MM-DD'),
                'num': item.num
            }));
        },

        setGroupings(state: storeRecord, getters: any) {
            const newList = getters.setSorting;
            let hash: any[];
            if (newList.length === 0) {
                hash = [];
            } else {
                hash = [{createAt: newList[0].createAt, items: [newList[0]]}];
                //去重
                for (let i = 1; i < newList.length; i++) {
                    const currentitem = newList[i];
                    const lastitem = hash[hash.length - 1];
                    if (dayjs(currentitem.createAt).isSame(lastitem.createAt)) {
                        lastitem.items.push(currentitem);
                    } else {
                        hash.push({createAt: currentitem.createAt, items: [currentitem]});
                    }
                }
            }
            return hash;
        },
        setSorting(state: storeRecord) {
            const newList = clone(state.recordLists);
            newList.forEach(item => {
                item.createAt = dayjs(item.createAt).format('YYYY-MM-DD');
            });
            newList.sort((a, b) => dayjs(a.createAt).valueOf() - dayjs(b.createAt).valueOf());
            return newList.reverse();
        },
        //月账单{}
        getMonList(state: storeRecord, getters: any) {
            return function (date: string) {
                return getters['setSorting']
                    .filter((item: { createAt: string }) =>
                        dayjs(item.createAt).format('YYYY-MM') === dayjs(date).format('YYYY-MM')
                    );
            };
        },
        payOrIncomeSelect(state: storeRecord, getters: any) {
            return function (date: string, payOrIncome: string) {
                const num ={
                    billy: 0,
                    total: 0
                }
                const toMonthList = getters['getMonList'](date);
                if (toMonthList.length === 0) {
                    // @ts-ignore
                    return num
                    // state.billy = 0;
                    // state.total = 0;
                    // return;
                } else {
                    // @ts-ignore
                    let midArr: any[] = [];
                    midArr = toMonthList.filter((item: { createAt: string | number | Date | dayjs.Dayjs | undefined; types: string })=>
                        dayjs(item.createAt).format('YYYY-MM') === date
                        &&
                        item.types === payOrIncome
                    )
                    num.total = midArr.length;
                    midArr.forEach(res=>{
                        num.billy = num.billy + res.num;
                    })
                    return num

                    // toMonthList.forEach((res: { items: any[]; }) => {
                    //     // @ts-ignore
                    //     let x = res.items.filter((item: { createAt: string | number | Date | dayjs.Dayjs | undefined; types: string; }) =>
                    //         dayjs(item.createAt).format('YYYY-MM') === date
                    //         &&
                    //         item.types === payOrIncome
                    //     );
                    //     midArr.push(x);
                    // });

                    // let monthPayOrIncomeList: { num: number; }[] = [];
                    // midArr.forEach(res => {
                    //     res.forEach((item: { num: number; }) => {
                    //         monthPayOrIncomeList.push(item);
                    //     });
                    // });
                    //
                    // num.total = monthPayOrIncomeList.length;
                    // monthPayOrIncomeList.forEach((item: { num: number; }) => {
                    //     num.billy = num.billy + item.num;
                    // });

                    return num
                }
            };
        }

    }
};

export default recordStore;


