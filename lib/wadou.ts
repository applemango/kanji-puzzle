import { kanji } from "./kanji";
import { wadou } from "./type";
import { kanjiFilter } from "./utils/kanji";

const deleteArray = (i: number, arr: any[]) => {
    let array: any[] = []
    arr.map((data: any, i_: number)=> {
        if(i != i_)
            array.push(data)
    })
    return array
}


export const wadouRandomGenerator = (): wadou => {
    const random_kanji = kanji[Math.floor(Math.random() * 10)][0]
    const kanjis = kanjiFilter((k: string)=> k[0] == random_kanji || k[1] == random_kanji)
    if(kanjis.length < 4)
        return wadouRandomGenerator()
    const kanjir: any = new Array(4)
    let kanjil = kanjis.concat()
    for(let i = 0; i < kanjir.length; i++) {
        const random = Math.floor(Math.random() * kanjil.length)
        kanjir[i] = kanjil[random]
        kanjil = deleteArray(random, kanjil)
    }
    //const first = kanjis.filter((k: string)=> k[0] == random_kanji)
    //const last = kanjis.filter((k: string)=> k[1] == random_kanji)
    return {
        words: kanjir,
        correct: random_kanji,
        type: -1
    }
}