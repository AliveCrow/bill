import clone from '@/lib/clone';

type storeRecord={
    recordListsName:string,
    recordLists: TypeList[],
}

const recordStore = {
    namespaced:true,
    state:()=>({
        recordListsName: 'recordLists',
        recordLists:[],
    }),
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
    getters: {  }
}

export default recordStore