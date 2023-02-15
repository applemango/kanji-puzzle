import { kanji } from "../kanji"

export const kanjiFilter = (f: Function) => {
    return kanji.filter((k: string, i: number)=> f(k, i));
}