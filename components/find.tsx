import { find, findCreate, findExample } from "@/lib/type"
import { useEffect, useState } from "react"
import styles from "@/pages/scss/find.module.scss"
import stylesA from "@/pages/scss/all.module.scss"

import LineSeed from "@next/font/local"
import { deleteArray } from "@/lib/array"
const  lineSeed = LineSeed({ src : "./fonts/LINESeedJP_OTF_Rg.woff"})

const where = (x: number, y: number, data: find | null): number => {
    if(!data)
        return 0
    return x + (y + 1) * data.y
}

const isActive = (x: number, y: number, data: find | null, arr: Array<boolean> | null): boolean => {
    if(!arr)
        return false
    if(arr[where(x, y, data)])
        return true
    return false
}

const toActive = (x: number, y: number, data: find | null, arr: Array<boolean> | null): Array<boolean> | null => {
    if(!arr)
        return null
    let array = arr.concat()
    array[where(x, y, data)] = !array[where(x, y, data)]
    return array
}

export const FindComponent = ({data}:{
    data: find | null
}) => {
    const [click, setClick] = useState<Array<boolean> | null>(null)
    useEffect(()=> {
        if(!data)
            return
        const arr = new Array<boolean>(data.x * data.y)
        setClick(arr)
    },[data])
    if(!data)
        return <div />
    return <div style={{"--x": data.x} as React.CSSProperties} className={styles.table}>
        {data.data.map((line: string, i:number) => <div key={i} className={styles.line}>
            {line.split("").map((char: string, j:number) => <div key={j} onClick={(e: any)=> {
                setClick((click: Array<boolean> | null) => toActive(i, j, data, click))
            }} className={`${isActive(i, j, data, click) && styles.active} ${styles.char}`}>
                <p style={{fontFamily: lineSeed.style.fontFamily}}>{char}</p>
            </div>)}
        </div>)}
    </div> 
}

//const colors = ["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#78909C","#BDBDBD","#9E9E9E","#424242"]
const colors = ["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#0070f3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#FFC107","#FF9800","#FF5722"]

const setActive = (d: boolean, x: number, y: number, data: find | null, arr: Array<boolean> | null): Array<boolean> | null => {
    if(!arr)
        return null
    let array = arr.concat()
    array[where(x, y, data)] = d
    return array
}

type charData = {
    x: number,
    y: number,
    char: string,
    color?: string | null,
}
type charPair = [charData, charData | null]
type charPairNoNull = [charData, charData]

const charDataEqual = (a: charData | null, b: charData | null) => {
    if(!a || !b)
        return false
    if(a.x == b.x && a.y == b.y && a.char == b.char)
        return true
    return false
}

const pushPair = (clickPair: Array<charPair>, charData: charData | charPair) => {
    if(Array.isArray(charData)) {
        clickPair.push(charData)
        return
    }
    if(clickPair.length && !clickPair[clickPair.length - 1][1]) {
        charData.color = clickPair[clickPair.length - 1][0].color
        return clickPair[clickPair.length - 1][1] = charData
    }
    charData.color = colors[Math.floor(Math.random() * colors.length)]
    return clickPair.push([charData, null])
}

const popPair = (clickPair: Array<charPair>, charData: charData, setClick: Function, data: find) => {
    const position = PairPosition(clickPair, charData)
    if(position === -1)
        return clickPair
    const deletePosition = clickPair[position]
    clickPair = deleteArray(position, clickPair)
    if(charDataEqual(charData, deletePosition[1]))
        setClick((click: Array<boolean> | null) => setActive(false,deletePosition[0].x, deletePosition[0].y, data, click))
    if(charDataEqual(charData, deletePosition[0]) && deletePosition[1]) {
        /*
         * 既にnullでは無いことがcharDataEqualで確認している二も関わらずエラーが出る、
         * それは許容出来るがdeletePosition[1]がnullでは無い事を直接確認しているのにも関わらず
         * setActive関数に直接deletePosition[1].xと指定すると"Object is possibly 'null'."と出る、その為一回変数を経由している
         * 無いよnullの可能性
         */
        const x = deletePosition[1].x
        const y = deletePosition[1].y
        setClick((click: Array<boolean> | null) => setActive(false,x, y, data, click))
    }
    return clickPair
}

const PairPosition = (clickPair: Array<charPair>, target: charData) => {
    let r = -1;
    clickPair.map((charPair: charPair, index: number) => {
        if(charDataEqual(charPair[0], target) || charDataEqual(charPair[1], target))
            r = index
    })
    return r
}

const getColor = (clickPair: Array<charPair>, target: charData) => {
    const position = PairPosition(clickPair, target)
    if(position === -1)
        return "inherit"
    return clickPair[position][0].color || "inherit"
}

const getPairChars = (char: string, data: findCreate): Array<string> => {
    let res:Array<string> = [];
    const words = data.words.concat()
    words.map((word) => {
        if(word[0] == char)
            res.push(word[1])
        if(word[1] == char)
            res.push(word[0])
    })
    return res
}

const getPairCharPositions = (char: string, data: findCreate): Array<charData> => {
    let pairPositions: Array<charData> = []
    const d = data.data.concat()
    d.map((l: string, i: number) => l.split("").map((c: string, j: number) => {
        if(c == char)
            pairPositions.push({x: i, y: j, char: c})
    }))
    return pairPositions
}

export const FindPlayComponent = ({data}:{
    data: null | findCreate
}) => {
    const [click, setClick] = useState<Array<boolean> | null>(null)
    const [clickPair, setClickPair] = useState<Array<charPair>>([])
    const [totalClicks, setTotalClicks] = useState<number>(0)
    const hintMax = 3
    const [hintUsed, setHintUsed] = useState(3)
    const [hintMode, setHintMode] = useState(false)

    useEffect(()=> {
        if(!data)
            return
        const arr = new Array<boolean>(data.x * data.y)
        setClick(arr)
    },[data])
    if(!data)
        return <div />
    //console.log(data)
    //console.log(click, clickPair)
    return <>
    <div style={{"--x": data.x} as React.CSSProperties} className={styles.table}>
        {data.data.map((line: string, i:number) => <div key={i} className={styles.line}>
            {line.split("").map((char: string, j:number) => <div key={j} onClick={(e: any)=> {
                //xとyを間違えた、支障は無いので続ける
                //x: i, y: j x <- xだけど今使っている
                //x: j, y: i o
                const me: charData = {
                    x: i,
                    y: j,
                    char: char
                }

                if(getColor(clickPair, me) == "#fff")
                    return

                if(hintMode) {
                    setHintMode(false)
                    if(isActive(i, j, data, click)) {
                        setClickPair((clickPair) => popPair(clickPair, me, setClick, data))
                    }
                    const pairChars = getPairChars(me.char, data)[0]
                    const charPosition = getPairCharPositions(pairChars, data)[0]
                    if(!charPosition)
                        return
                    setClickPair((clickPair) => popPair(clickPair, charPosition, setClick, data))
                    const charPair: charPairNoNull = [
                        {x: me.x, y: me.y, char: me.char, color: "#fff"},
                        {x: charPosition.x, y: charPosition.y, char: charPosition.char, color: "#fff"}
                    ]
                    setClickPair((clickPair)=> [...clickPair, charPair])
                    setClick((click: Array<boolean> | null) => setActive(true,charPair[0].x, charPair[0].y, data, click))
                    setClick((click: Array<boolean> | null) => setActive(true,charPair[1].x, charPair[1].y, data, click))
                    return
                }

                if(isActive(i, j, data, click)) {
                    setClickPair((clickPair) => popPair(clickPair, me, setClick, data))
                } else {
                    pushPair(clickPair, me)
                }
                setClick((click: Array<boolean> | null) => toActive(i, j, data, click))
            }} style={{
                color: getColor(clickPair, {x: i, y: j, char: char})
            }} className={`${isActive(i, j, data, click) && styles.active} ${styles.char}`}>
                <p style={{fontFamily: lineSeed.style.fontFamily}}>{char}</p>
            </div>)}
        </div>)}
    </div> 
    <div style={{

    }}>
        <button className={stylesA.button} style={{
            margin: 0,
            marginTop: 12,
            boxShadow: "none",
            border: "1px solid #eee",
            borderLeft: "1px solid #eee",
            cursor: "pointer",
            backgroundColor: hintMode ? "#f8f8f8" : "#fff"
        }} onClick={() => {
            setHintMode((mode: boolean) => !mode)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bulb" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFC107" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                <line x1="9.7" y1="17" x2="14.3" y2="17" />
            </svg>
        </button>
    </div>
    </>
}