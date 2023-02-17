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

const pickRandomKanji = (kanji: Array<string>, arr: Array<string>, n = 0, level?: number, tl?: number): any => {
    let l = level
    if(typeof l == "string")
        try {
            l = Number(l)
        } catch (e) {l = kanji.length}
    const lev =
        tl
            ? tl
            : typeof level == "number" || typeof level ==  "string"
                ? level > kanji_levels.length
                    ? level
                    : kanji_levels[level]
                : kanji.length
    const k = kanji[Math.floor(Math.random() * lev)]
    if(n > 100)
        return " "
    if(arr.includes(k))
        return pickRandomKanji(kanji, arr, n + 1, level)
    return k
}

export const findRandomGenerator = (len: number, level?: number, tl?: number): Array<string> => {
    const data = kanji
    let arr = new Array(len)
    for (let i = 0; i < len; i++) {
        const k = pickRandomKanji(data, arr, 0, level, tl)
        arr[i] = k
    }
    return arr
}

const kanji_levels: Array<number> = [
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


type level = {
    x: number,
    y: number,
    kanji: number,
    words?: number | undefined
}
type levels_ = Array<level>
export const findLevels: levels_ =  [
    {x: 2, y: 2, kanji: 6},
    {x: 2, y: 2, kanji: 10},
    {x: 2, y: 2, kanji: 100},
    {x: 2, y: 2, kanji: 300},
    {x: 4, y: 4, kanji: 50},
    {x: 6, y: 4, kanji: 80},
    {x: 6, y: 4, kanji: 160},
    {x: 6, y: 4, kanji: 200},
    {x: 8, y: 4, kanji: 180},
    {x: 8, y: 4, kanji: 240},
    {x: 10, y: 4, kanji: 240},
    {x: 10, y: 4, kanji: 320},
    {x: 10, y: 4, kanji: 400},
    {x: 10, y: 4, kanji: 500},
    {x: 10, y: 4, kanji: 600},
    {x: 10, y: 4, kanji: 700},
    {x: 10, y: 4, kanji: 850},
    {x: 10, y: 4, kanji: 1000},
    {x: 10, y: 4, kanji: 1200},
    {x: 10, y: 4, kanji: 1400},
    {x: 10, y: 4, kanji: 1600},
    {x: 10, y: 4, kanji: 1800},
    {x: 10, y: 4, kanji: 2400},
    {x: 10, y: 4, kanji: 2800},
    {x: 10, y: 4, kanji: 3600},
    {x: 10, y: 4, kanji: 4000},
    {x: 10, y: 4, kanji: 5000},
    {x: 10, y: 4, kanji: 6000},
    {x: 10, y: 4, kanji: 7000},
    {x: 10, y: 4, kanji: 8000},
    {x: 10, y: 4, kanji: 9000},
    {x: 10, y: 4, kanji: 10000},
    {x: 10, y: 4, kanji: 12000},
    {x: 10, y: 4, kanji: 14000},
    {x: 10, y: 4, kanji: 18000},
    {x: 10, y: 4, kanji: kanji.length},
]