import Vue from 'vue';
import Vuex from 'vuex';
import tagsStore from '@/store/tagsStore';
import recordStore from '@/store/recordStore';
import dayjs from 'dayjs';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        date:'',

    },
    mutations:{
        setDate(state,date){
            state.date = date || dayjs().format('YYYY-MM-DD')
        },
    },
    actions:{},
    getters:{
        getDate(state,getters){
            return function (format:string){
                return dayjs(state.date).format(format)
            }
        }
    },
    modules: {
        tagsStore:tagsStore,
        recordStore:recordStore,
    }
});
