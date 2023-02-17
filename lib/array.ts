export const setArray = (i: number, data: any, arr: any[]) => {
    let array = arr.concat()
    array[i] = data
    
    return array
}
export const deleteArray = (i: number, arr: any[]) => {
    let array: any[] = []
    arr.map((data: any, i_: number)=> {
        if(i != i_)
            array.push(data)
    })
    return array
}