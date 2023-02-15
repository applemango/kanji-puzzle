import { wadou } from "@/lib/type"
import stylesA from "@/pages/scss/all.module.scss"
import { useState } from "react"
import { Table } from "./table"
import styles from "@/pages/scss/wadou.module.scss"

export const createWadouTableGetType = (str: string, i: number, correct: string) => {
    const type = [
        ["↓","→","←","↑"],
        ["↑","←","→","↓"]
    ]
    if(str[0]==correct)
        return type[1][i]
    return type[0][i]
}

export const createWadouTable = (data: wadou, input: string) => {
    let arr: any = []
    data.words.map((word: string, i: number)=> {
        if(word[0]==data.correct)
            return arr.push(word[1])
        return arr.push(word[0])
    })
    return [[
        undefined,
        undefined,
        arr[0],
        undefined,
        undefined
    ],[
        undefined,
        undefined,
        createWadouTableGetType(data.words[0], 0, data.correct),
        undefined,
        undefined
    ],[
        arr[1],
        createWadouTableGetType(data.words[1], 1, data.correct),
        input[0],
        createWadouTableGetType(data.words[2], 2, data.correct),
        arr[2],
    ],[
        undefined,
        undefined,
        createWadouTableGetType(data.words[3], 3, data.correct),
        undefined,
        undefined
    ],[
        undefined,
        undefined,
        arr[3],
        undefined,
        undefined,
    ]]
}

export const WadouComponent = ({data, create = false}:{
    data: wadou | null,
    create?: boolean
}) => {
    const [input, setInput] = useState("")
    const [correct, setCorrect] = useState<boolean | null>(null)
    if(!data)
        return <div/>
    return <div className={correct != null ? correct ? styles.correct : styles.incorrect : ""}>
        <Table data={createWadouTable(data, input)} />
        { !create &&
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <input className={stylesA.input} style={{
                    width: 256,
                    boxShadow: "none",
                    borderRight: "none",
                    marginRight: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                }} type="text" value={input} onChange={(e: any) => {
                    setInput(e.target.value)
                    setCorrect(null)
                }}/>
                <button className={stylesA.button} style={{
                    margin: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    boxShadow: "none",
                    border: "1px solid #eee",
                    cursor: "pointer"
                }} onClick={() => {
                    if(input == data.correct)
                        return setCorrect(true)
                    setCorrect(false)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wand" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="6 21 21 6 18 3 3 18 6 21" />
                        <line x1="15" y1="6" x2="18" y2="9" />
                        <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                        <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                    </svg>
                </button>
            </div>
        }
    </div>
}