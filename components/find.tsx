import { find, findCreate, findExample } from "@/lib/type"
import { useEffect, useState } from "react"
import styles from "@/pages/scss/find.module.scss"
import stylesA from "@/pages/scss/all.module.scss"

import LineSeed from "@next/font/local"
import { deleteArray } from "@/lib/array"
import { kanji, kanjiYomi } from "@/lib/kanji"
import { kanjiFilter } from "@/lib/utils/kanji"
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
const colorHint = "#f5f5f5"


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

const getBackground = (clickPair: Array<charPair>, target: charData) => {
    const position = PairPosition(clickPair, target)
    if(position === -1)
        return "#fff"
    if(!clickPair[position][1])
        return "#fff"
    if(clickPair[position][0].color == colorHint)
        return "#ddd"
    return "#eee"
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

const checkClickPair = (clickPair: Array<charPair>): Array<charPair> => {
    const colorOk = "#00b341"
    const colorError = "#e00"
    const cp = clickPair.concat()
    for (let i = 0; i < cp.length; i++) {
        const f = cp[i][0]
        const l = cp[i][1] // "Object is possibly 'null'."
        if(f.color == colorHint)
            continue
        if(!(l && f)) {
            cp[i][0].color = colorError
            continue
        }
        const a = f.char + l.char
        const b = l.char + f.char
        if(!(kanji.includes(a) || kanji.includes(b))) {
            l.color = colorError
            f.color = colorError
            continue
        }
        l.color = colorOk
        f.color = colorOk
    }
    return cp
}

const clickPairToRandomColor = (clickPair: Array<charPair>): Array<charPair> => {
    const cp = clickPair.concat()
    for(let i = 0; i < cp.length; i++) {
        const f = cp[i][0]
        const l = cp[i][1] // "Object is possibly 'null'."
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        if(f.color == colorHint)
            continue
        if(!l) {
            f.color = randomColor
            continue
        }
        f.color = randomColor
        l.color = randomColor
    }
    return cp
}

const searchChar = (char: string): Array<string> => {
    const res_ = kanjiFilter((str: string)=> {
        if(str[0] == char || str[1] == char)
            return true
        return false
    })
    const rf = res_.concat().filter((str)=> {
        if(str[0] == char)
            return true
        return false
    })
    const rl = res_.concat().filter((str)=> {
        if(str[1] == char)
            return true
        return false
    })
    return rf.concat(rl)
}

type searchResult = string

export const FindPlayComponent = ({data}:{
    data: null | findCreate
}) => {
    const [click, setClick] = useState<Array<boolean> | null>(null)
    const [clickPair, setClickPair] = useState<Array<charPair>>([])
    const [totalClicks, setTotalClicks] = useState<number>(0)
    const hintMax = 3
    const [hintUsed, setHintUsed] = useState(0)
    const [hintMode, setHintMode] = useState(false)
    const [canCheck, setCanCheck] = useState(true)
    const [checkUsed, setCheckUsed] = useState(false)

    const [searchMode, setSearchMode] = useState(false)
    const [searchResult, setSearchResult] = useState<Array<searchResult>>([])
    const [showSolution, setShowSolution] = useState(false)

    const [end, setEnd] = useState(false)
    useEffect(()=> {
        if(!data)
            return
        const arr = new Array<boolean>(data.x * data.y)
        setClick(arr)
    },[data])
    useEffect(()=> {
        if(clickPair.length == data?.words.length && clickPair[clickPair.length - 1][1])
            return setEnd(true)
        return setEnd(false)
        //return setCanCheck(true)
        //setCanCheck(false)
    })
    if(!data)
        return <div />
    //console.log(data)
    //console.log(click, clickPair)
    return <>
    <div style={{"--x": data.x, marginTop: 24} as React.CSSProperties} className={styles.table}>
        {data.data.map((line: string, i:number) => <div key={i} className={styles.line}>
            {line.split("").map((char: string, j:number) => <div key={j} onClick={(e: any)=> {
                //xとyを間違えた、支障は無いので続ける(簡単に変更出来るがややこしくなるため)
                //x: i, y: j | x <- xだけど今使っている
                //x: j, y: i | o
                const me: charData = {
                    x: i,
                    y: j,
                    char: char
                }
                
                if(checkUsed) {
                    setClickPair((cp)=> {
                        return clickPairToRandomColor(cp)
                    })
                    setCheckUsed(false)
                    return
                }

                if(searchMode) {
                    setSearchResult(searchChar(me.char))
                    setSearchMode(false)
                    return
                }

                if(getColor(clickPair, me) == colorHint)
                    return

                if(hintMode) {
                    if(isActive(i, j, data, click)) {
                        setClickPair((clickPair) => popPair(clickPair, me, setClick, data))
                    }
                    const pairChars = getPairChars(me.char, data)[0]
                    const charPosition = getPairCharPositions(pairChars, data)[0]
                    if(!charPosition)
                        return
                    setClickPair((clickPair) => popPair(clickPair, charPosition, setClick, data))
                    const charPair: charPairNoNull = [
                        {x: me.x, y: me.y, char: me.char, color: colorHint},
                        {x: charPosition.x, y: charPosition.y, char: charPosition.char, color: colorHint}
                    ]
                    setClickPair((clickPair)=> [...clickPair, charPair])
                    setClick((click: Array<boolean> | null) => setActive(true,charPair[0].x, charPair[0].y, data, click))
                    setClick((click: Array<boolean> | null) => setActive(true,charPair[1].x, charPair[1].y, data, click))
                    setHintMode(false)
                    setHintUsed((used)=> used + 1)
                    return
                }

                if(isActive(i, j, data, click)) {
                    setClickPair((clickPair) => popPair(clickPair, me, setClick, data))
                } else {
                    pushPair(clickPair, me)
                }
                setClick((click: Array<boolean> | null) => toActive(i, j, data, click))
            }} style={{
                color: getColor(clickPair, {x: i, y: j, char: char}),
                backgroundColor: getBackground(clickPair, {x: i, y: j, char: char}),
            }} className={`${isActive(i, j, data, click) && styles.active} ${styles.char}`}>
                <p style={{fontFamily: lineSeed.style.fontFamily}}>{char}</p>
            </div>)}
        </div>)}
    </div> 
    <div className={styles.buttons_container} style={{
        display: "flex",
        position: "relative",
        backgroundColor: (hintMode || showSolution || searchMode || checkUsed) ? "#f8f8f8" : "#fff",
        marginTop: 12
    }}>
        <button className={stylesA.button} style={{
            margin: 0,
            marginTop: 0,
            boxShadow: "none",
            border: "1px solid #eee",
            borderLeft: "1px solid #eee",
            cursor: "pointer",
            //backgroundColor: (hintMode || showSolution || searchMode) ? "#f8f8f8" : "#fff",
            background: "none",
            borderRight: "none",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        }} onClick={() => {
            setSearchResult([])
            setSearchMode((mode)=> !mode)
            setHintMode(false)
            setShowSolution(false)
            if(checkUsed) {
                setClickPair((cp)=> {
                    return clickPairToRandomColor(cp)
                })
                setCheckUsed(false)
                return
            }
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-search" width="42" height="42" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="15" cy="15" r="4" />
                <path d="M18.5 18.5l2.5 2.5" />
                <path d="M4 6h16" />
                <path d="M4 12h4" />
                <path d="M4 18h4" />
            </svg>
        </button>
        <button className={stylesA.button} style={{
            margin: 0,
            marginTop: 0,
            boxShadow: "none",
            border: "1px solid #eee",
            borderLeft: "none",
            cursor: "pointer",
            //backgroundColor: (hintMode || showSolution || searchMode) ? "#f8f8f8" : "#fff",
            background: "none",
            borderRight: "none",
            borderRadius: 0
        }} onClick={() => {
            setSearchResult([])
            setShowSolution((mode) => !mode)
            setHintMode(false)
            setSearchMode(false)
            if(checkUsed) {
                setClickPair((cp)=> {
                    return clickPairToRandomColor(cp)
                })
                setCheckUsed(false)
                return
            }
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list" width="42" height="42" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <line x1="5" y1="6" x2="5" y2="6.01" />
              <line x1="5" y1="12" x2="5" y2="12.01" />
              <line x1="5" y1="18" x2="5" y2="18.01" />
            </svg>
        </button>
        <button className={stylesA.button} style={{
            margin: 0,
            marginTop: 0,
            boxShadow: "none",
            border: "1px solid #eee",
            borderLeft: "none",
            cursor: "pointer",
            //backgroundColor: (hintMode || showSolution || searchMode) ? "#f8f8f8" : "#fff",
            background: "none",
            borderRight: canCheck ? "none" : "1px solid #eee",
            borderRadius: 0,
            borderTopRightRadius: canCheck ? 0 : 4,
            borderBottomRightRadius: canCheck ? 0 : 4
        }} onClick={() => {
            setHintMode((mode) => !mode)
            setSearchMode(false)
            setShowSolution(false)
            if(checkUsed) {
                setClickPair((cp)=> {
                    return clickPairToRandomColor(cp)
                })
                setCheckUsed(false)
                return
            }
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bulb" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFC107" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                <line x1="9.7" y1="17" x2="14.3" y2="17" />
            </svg>
        </button>
        {canCheck && <button className={stylesA.button} style={{
            margin: 0,
            marginTop: 0,
            boxShadow: "none",
            border: "1px solid #eee",
            borderLeft: "none",
            cursor: "pointer",
            //backgroundColor: (hintMode || showSolution || searchMode) ? "#f8f8f8" : "#fff",
            background: "none",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        }} onClick={()=> {
            setHintMode(false)
            setSearchMode(false)
            setShowSolution(false)
            if(checkUsed) {
                setClickPair((cp)=> {
                    return clickPairToRandomColor(cp)
                })
                setCheckUsed(false)
                return
            }
            setCheckUsed(true)
            setClickPair((arr)=> {
                return checkClickPair(arr)
            })
        }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="42" height="42" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6f32be" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M5 12l5 5l10 -10" />
                </svg>
        </button>}
        
        <div className={styles.button_hover} style={{
            transform:
                (hintMode || showSolution || searchMode || checkUsed)
                    ? hintMode
                        ? `translateX(${128}px)`
                        : showSolution
                            ? `translateX(${64}px)`
                            : checkUsed
                                ? `translateX(${192}px)`
                                : `translateX(${0})`
                    : "inherit",
            opacity: (hintMode || showSolution || searchMode || checkUsed) ? 1 : 0,
            backgroundColor: (hintMode || showSolution || searchMode || checkUsed) ? "#eee" : "#f5f5f5"
        }} />
        <div className={styles.tooltip}><p>選択した漢字が使われている単語を検索します</p></div>
        <div className={styles.tooltip}><p>答えを表示します</p></div>
        <div className={styles.tooltip}><p>選択した漢字のペアを選択します</p></div>
        <div className={styles.tooltip}><p>見つけた単語が存在するか確認します</p></div>

    </div>
    <div style={{
        //borderBottom: "1px solid #000",
        marginTop: 16,
        width: "80%",
        transition: "all .3s ease",
        opacity: (searchResult.length
                    ? searchResult
                    : showSolution
                        ? data.words
                        : []).length ? 1 : 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
    }}>
        { (searchResult.length
            ? searchResult
            : showSolution
                ? data.words
                : []).map((word: string, i: number)=> <div key={i} style={{
            display: "flex",
            alignItems: "baseline",
            borderTop: "1px solid #000",
            height: 69
        }}>
            <p style={{
                margin: 0,
                marginRight: 2,
                marginLeft: 12,
                marginTop: 8,
                fontSize: 32,
                fontFamily: lineSeed.style.fontFamily,
            }}>{word}</p>
            <p style={{
                fontFamily: lineSeed.style.fontFamily,
                width: 80,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
            }}>{kanjiYomi[word] == "nan" || !kanjiYomi[word] ? "" : kanjiYomi[word] }</p>
        </div>)}
    </div>
    {end && <Effect />}
    </>
}

export const Effect = () => {
    const n = 300
    const [arr, setArr] = useState([])
    useEffect(()=> {
        let a: any = new Array(n)
        for (let i = 0; i < a.length; i++) {
            a[i] = undefined;
        }
        setArr(a)
    },[])
    return <div className={stylesA.effect_container}>{arr.map((_, i)=> <div key={i} style={Object.assign({
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.floor(Math.random() * 100)}%`,
        animationDuration: `${Math.random() * 3}s`,
        animationDelay: `${Math.random()}s`
    }, {
        "--random": Math.random() * 2 - 1
    } as React.CSSProperties)} className={stylesA.effect} />)}</div>
}