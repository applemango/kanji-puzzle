import { kanji } from "./kanji"

const where = (x: number, y: number, y_: number): number => {
    return x + y * y_
}

const arrayToString = (arr: Array<string>): string => {
    const array = arr.concat()
    let str = ""
    array.map((str_: string) => str += str_)
    return str
}

const pickRandom = (str: string, i: number, arr: Array<any>): string => {
    const random = Math.floor(Math.random() * str.length)
    let str_ = ""
    str.split("").map((char: string, i_: number)=> {
        if(random != i_)
            return str_ += char
        arr[i] = char
    })
    return str_
}

export const findGenerator = (words: Array<string>, x: number, y: number): Array<string> => {
    let str = arrayToString(words)
    if(str && x && y && str.length < x * y)
        str += " ".repeat(x * y - str.length)

    let arr = new Array(str.length)
    for(let i = 0; i < arr.length; i++) {
        str = pickRandom(str, i, arr)
    }

    let result = new Array(y)
    for(let i = 0; i < y; i++) {
        result[i] = ""
        for(let j = 0; j < x; j++) {
            result[i] += arr[where(i, j, y)]
        }
    }

    return result
}

const pickRandomKanji = (kanji: Array<string>, arr: Array<string>): any => {
    const k = kanji[Math.floor(Math.random() * kanji.length)]
    if(arr.includes(k))
        return pickRandomKanji(kanji, arr)
    return k
}

export const findRandomGenerator = (len: number): Array<string> => {
    const data = kanji
    let arr = new Array(len)
    for (let i = 0; i < len; i++) {
        const k = pickRandomKanji(data, arr)
        arr[i] = k
    }
    return arr
}