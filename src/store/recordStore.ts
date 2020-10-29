import clone from '@/lib/clone';
import dayjs from 'dayjs';
require('dayjs/locale/zh-cn')


type storeRecord={
    recordListsName:string,
    recordLists: TypeList[],
}

const state:storeRecord = {
    recordListsName: 'recordLists',
    recordLists:[],
}

const recordStore = {
    namespaced:true,
    state,
    mutations: {
        //recordList
        recordListgetter(state:storeRecord){
            state.recordLists = JSON.parse(localStorage.getItem(state.recordListsName) ||"[]")
        },
        recordListSetter(state:storeRecord,list:TypeList){
            const recoedClone = clone(list)
            state.recordLists.push(recoedClone);
            localStorage.setItem(state.recordListsName,JSON.stringify(state.recordLists))
        },
    },
    actions: {  },
    getters: {
        extracting(state:storeRecord){
            return state.recordLists.map(item => ({'createAt': dayjs(item.createAt).format('YYYY-MM-DD'), 'num': item.num}))
        },
        setGroupings(state:storeRecord,getters:any){
            let newList = getters.setSorting
            let hash: any[]
            if(newList.length===0){
                hash = []
            }else {
                hash = [{createAt:newList[0].createAt,items:[newList[0]]}]
                //去重
                for(let i=1;i<newList.length;i++){
                    let currentitem = newList[i];
                    let lastitem = hash[hash.length-1]
                    if(dayjs(currentitem.createAt).isSame(lastitem.createAt)){
                        lastitem.items.push(currentitem)
                    }else {
                        hash.push({createAt:currentitem.createAt,items:[currentitem]})
                    }
                }
            }
            return hash
        },
        setSorting(state:storeRecord){
            let newList = clone(state.recordLists)
            newList.forEach(item=>{
                item.createAt = dayjs(item.createAt).format('YYYY-MM-DD')
            })
            newList.sort((a,b)=>dayjs(a.createAt).valueOf() - dayjs(b.createAt).valueOf())
            return newList.reverse();
        }
    }
}

export default recordStore


