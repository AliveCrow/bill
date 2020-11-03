import createId from '@/lib/createId';

type storeTags = {
    tagsListName: string,
    tagsDataSource: Tag[] | undefined
}

const state: storeTags = {
    tagsListName: 'tags',
    tagsDataSource: []
};

const tagsStore = {
    namespaced: true,
    state,
    mutations: {
        //tag
        tagsGetter: function (state: storeTags) {
            if(!localStorage.getItem(state.tagsListName)){
                let defaultTag =
                    JSON.stringify([{'id': 1, 'name': '买衣服'}, {'id': 2, 'name': '购物'}, {'id': 3, 'name': '游戏'}, {'id': 4, 'name': '出行'}, {'id': 5, 'name': '吃饭'}, {'id': 6, 'name': '旅游'}])
                localStorage.setItem('tags', defaultTag);
            }
            state.tagsDataSource = JSON.parse(localStorage.getItem(state.tagsListName) || '[]');
        },
        tagsSetter: function (state: storeTags, value: string) {
            // @ts-ignore
            const list = state.tagsDataSource.filter(item => item.name === value);
            if (list.length !== 0) {
                // @ts-ignore
                // alert('已有同名标签');
                // return 'duplicated';
            } else if (value === '') {
                // alert('标签不能为空');
                // return 'tag is empty';
            } else {
                let id = createId();
                // @ts-ignore
                state.tagsDataSource.push({id: id, name: value});
                localStorage.setItem('idMax', id.toString());
                localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
                // return 'success';
            }
        },
        tagsUpdate: function (state: storeTags, args: { index: number, tagName: string }) {
            // @ts-ignore
            let a = state.tagsDataSource[args.index].name
            if(args.tagName===''){
                alert('标签不能为空');
                return
            }
            const items = state.tagsDataSource!.filter((item: { name: string; }) => item.name === args.tagName);
            // @ts-ignore
            if (state.tagsDataSource[args.index].name === args.tagName) {
            } else if (items.length !== 0) {
                alert('已有同名标签');
                return
            } else {
                // @ts-ignore
                state.tagsDataSource[args.index].name = args.tagName;
                localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
                return
            }
        },
        tagsRemoved: function (state: storeTags, index: number) {
            state.tagsDataSource!.splice(index, 1);
            localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
            return 'success';
        }
    },
    actions: {},
    getters: {}
};

export default tagsStore;