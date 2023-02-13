import { find, findExample } from "@/lib/type"
import { useEffect, useState } from "react"
import styles from "@/pages/scss/find.module.scss"

import LineSeed from "@next/font/local"
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