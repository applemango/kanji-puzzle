import { kanji } from "./kanji"

const where = (x: number, y: number, y_: number): number => {
    return x + y * y_
}

const arrayToString = (arr: Array<string>): string => {
    const array = arr.concat()
    let str = ""
    array.map((str_: string) =>
        str_
            ? str += str_
            : str += " ")
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

const pickRandomKanji = (kanji: Array<string>, arr: Array<string>, n = 0, level?: number): any => {
    let l = level
    if(typeof l == "string")
        try {
            l = Number(l)
        } catch (e) {l = kanji.length}
    const lev = 
        typeof level == "number" || typeof level ==  "string"
        ? level > levels.length
            ? level
            : levels[level]
        : kanji.length
    const k = kanji[Math.floor(Math.random() * lev)]
    if(n > 100)
        return " "
    if(arr.includes(k))
        return pickRandomKanji(kanji, arr, n + 1, level)
    return k
}

export const findRandomGenerator = (len: number, level?: number): Array<string> => {
    const data = kanji
    let arr = new Array(len)
    for (let i = 0; i < len; i++) {
        const k = pickRandomKanji(data, arr, 0, level)
        arr[i] = k
    }
    return arr
}

const levels: Array<number> = [
    10,
    30,
    50,
    75,
    105,
    140,
    190,
    250,
    320,
    400,
    500,
    600,
    700,
    850,
    1000,
    1200,
    1400,
    1600,
    1800,
    2000,
    2400,
    2800,
    3600,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    12000,
    14000,
    18000,
    kanji.length
]