import Vue from 'vue';
import Vuex from 'vuex';
import tagsStore from '@/store/tagsStore';
import recordStore from '@/store/recordStore';
import billyStore from '@/store/billy';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{

    },
    mutations:{},
    actions:{},
    getters:{},
    modules: {
        tagsStore:tagsStore,
        recordStore:recordStore,
        billyStore:billyStore
    }
});
