import { Table } from "@/components/table"
import { createWadouTable, WadouComponent } from "@/components/wadou"
import { kanji, kanjiYomi } from "@/lib/kanji"
import { loadObject, saveObject } from "@/lib/save"
import { wadou, wadouExample } from "@/lib/type"
import { kanjiFilter } from "@/lib/utils/kanji"
import { wadouRandomGenerator } from "@/lib/wadou"
import stylesA from "@/pages/scss/all.module.scss"
import styles from "@/pages/scss/wadou.module.scss"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const WadouRandom_ = () => {
    const[inputData, setInputData] = useState<string>("")
    const [data, setData] = useState<wadou | null>(null)
    const [history, setHistory] = useState<Array<wadou>>([])
    const [back, setBack] = useState(0)
    const [input, setInput] = useState("")
    const [correct, setCorrect] = useState<boolean | null>(null)

    useEffect(()=> {
        if(!data) {
            const newData = wadouRandomGenerator()
            setData(newData)
            setHistory([newData])
        }
    },[])
    if(!data)
        return <div />
    if(!data)
        return <div/>
    return <div style={{minHeight: "100vh"}} className={stylesA.play}>
        <div className={correct != null ? correct ? styles.correct : styles.incorrect : ""}>
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <button style={{
                    marginRight: 16,
                    boxShadow: "none",
                    border: "1px solid #eee",
                    borderLeft: "1px solid #eee",
                    cursor: "pointer",
                    visibility: !history.length || !(history.length - 1 > back) ? "hidden" : "inherit"
                }} onClick={(e: any)=> {
                    if(history.length > back) {
                        setData(history[history.length - (back + 2)])
                        setBack((old: number)=> old + 1)
                        setInput("")
                        setCorrect(null)
                    }
                }} className={stylesA.button}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="5" y1="12" x2="11" y2="18" />
                            <line x1="5" y1="12" x2="11" y2="6" />
                        </svg>
                    </button>
                <Table data={createWadouTable(data, input)} />
                <button style={{
                    marginLeft: 16,
                    boxShadow: "none",
                    border: "1px solid #eee",
                    borderLeft: "1px solid #eee",
                    cursor: "pointer",
                    visibility: !(correct || back) ? "hidden" : "inherit"
                }} onClick={(e: any)=> {
                    if(back) {
                        setData(history[history.length - back])
                        setInput("")
                        setCorrect(null)
                        return setBack((old: number)=> old - 1)
                    }
                    const newData = wadouRandomGenerator()
                    setHistory((old: Array<wadou>)=> [...old, newData])
                    setData(newData)
                    setInput("")
                    setCorrect(null)
                }} className={stylesA.button}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-right" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="13" y1="18" x2="19" y2="12" />
                            <line x1="13" y1="6" x2="19" y2="12" />
                        </svg>
                    </button>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                marginLeft: 80
            }}>
                <input className={stylesA.input} style={{
                    width: 192,
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
                    borderRadius: 0,
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
                <button className={stylesA.button} style={{
                    margin: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    boxShadow: "none",
                    border: "1px solid #eee",
                    cursor: "pointer",
                    borderLeft: "none"
                }} onClick={() => {
                    setCorrect(true)
                    setInput(data.correct)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bulb" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1c40f" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                        <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                        <line x1="9.7" y1="17" x2="14.3" y2="17" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
}
export default WadouRandom_