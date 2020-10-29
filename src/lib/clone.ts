function clone<Type>(data:Type):Type{
    return  JSON.parse(JSON.stringify(data));
}

export default clone