
type TypeList = {
    tags: string[];
    remark: string;
    types: string;
    num: number;
    createAt: string;
}
type Tag = {
    id: number;
    name: string
}
type TagConfig = {
    data: Tag[];
    getter: (recordStoreExtracting: string) => Tag[];
    setter: (value: Tag) => 'success' | 'duplicated';
    update: (index: number, tagName: string) => 'success' | 'fail';
    remove:(index:number) =>  'success' | 'fail';
}