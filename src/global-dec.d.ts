
type TypeList = {
    tags: string[];
    remark: string;
    types: string;
    num: number;
    createAt: Date;
}
type Tag = {
    id: number;
    name: string
}
type TagConfig = {
    data: Tag[];
    getter: () => Tag[];
    setter: (value: Tag) => 'success' | 'duplicated';
    update: (index: number, tagName: string) => 'success' | 'fail';
    remove:(index:number) =>  'success' | 'fail';
}