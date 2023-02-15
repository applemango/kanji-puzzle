import { find, findExample } from "@/lib/type"
import { useEffect, useState } from "react"
import styles from "@/pages/scss/find.module.scss"

import LineSeed from "@next/font/local"
const  lineSeed = LineSeed({ src : "./fonts/LINESeedJP_OTF_Rg.woff"})

const where = (x: number, y: number, max: number): number => {
    return x + (y + 1) * max
}

const isActive = (x: number, y: number, max: number, arr: Array<boolean> | null): boolean => {
    if(!arr)
        return false
    if(arr[where(x, y, max)])
        return true
    return false
}

const toActive = (x: number, y: number, max: number, arr: Array<boolean> | null): Array<boolean> | null => {
    if(!arr)
        return null
    let array = arr.concat()
    array[where(x, y, max)] = !array[where(x, y, max)]
    return array
}

export const Table = ({data}:{
    data: Array<Array<any>>
}) => {
    const [click, setClick] = useState<Array<boolean> | null>(null)
    useEffect(()=> {
        if(!data)
            return
        const arr = new Array<boolean>(data.length * data[0].length)
        setClick(arr)
    },[data])
    return <div className={styles.table}>
        {data.map((line: Array<any>, i:number) => <div key={i} className={styles.line}>
            {line.map((char: string, j:number) => <div key={j} onClick={(e: any)=> {
                setClick((click: Array<boolean> | null) => toActive(i, j, data[0].length, click))
            }} className={`${isActive(i, j, data[0].length, click) && styles.active} ${styles.char}`}>
                <p style={{fontFamily: lineSeed.style.fontFamily}}>{char ? char : " "}</p>
            </div>)}
        </div>)}
    </div> 
}