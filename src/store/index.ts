import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId';
import clone from '@/lib/clone';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        recordListsName: 'recordLists',
        recordLists:[] as TypeList[],
        tagsListName: 'tags',
        tagsDataSource: [],
    },
    mutations: {

        //tag
        tagsGetter: function (state) {
            state.tagsDataSource = JSON.parse(localStorage.getItem(state.tagsListName) || '[]');
        },
        tagsSetter: function (state, value: string) {
            // @ts-ignore
            const list = state.tagsDataSource.filter(item => item.name === value);
            if (list.length !== 0) {
                // @ts-ignore
                alert('已有同名标签');
                return 'duplicated';
            } else if (value === '') {
                alert('标签不能为空');
                return 'duplicated';
            } else {
                let id = createId();
                // @ts-ignore
                state.tagsDataSource.push({id: id, name: value});
                localStorage.setItem('idMax', id.toString());
                localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
                return 'success';
            }
        },
        tagsUpdate: function (state, args: { index: number, tagName: string }) {
            const items = state.tagsDataSource.filter((item: { name: string; }) => item.name === args.tagName);
            // @ts-ignore
            if (state.tagsDataSource[args.index].name === args.tagName) {

            } else {
                if (items.length !== 0) {
                    alert('已有同名标签');
                    return 'fail';
                } else {
                    // @ts-ignore
                    state.tagsDataSource[args.index].name = args.tagName;
                    localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
                    return 'success';
                }
            }
        },
        tagsRemoved: function (state,index:number){
            console.log(index);
            state.tagsDataSource.splice(index,1)
            localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
            return 'success'
        },

        //recordList
        recordListgetter(state){
            state.recordLists = JSON.parse(localStorage.getItem(state.recordListsName) ||"[]")
        },
        recordListSetter(state,list:TypeList){
            const recoedClone = clone(list)
            state.recordLists.push(recoedClone);
            localStorage.setItem(state.recordListsName,JSON.stringify(state.recordLists))
        },


    },
    actions: {},
    modules: {}
});
