import { FindComponent } from "@/components/find"
import { find, findCreate, findCreateExample, findExample } from "@/lib/type"
import { useEffect, useState } from "react"
import styles from "@/pages/scss/find.module.scss"
import { useRouter } from "next/router"
import { loadObject, saveObject } from "@/lib/save"
import { findGenerator } from "@/lib/find"

const setArray = (i: number, data: any, arr: any[]) => {
    const array = arr.concat().map((data_: any, i_: number)=> i == i_ ? data : data_ )
    return array
}
const deleteArray = (i: number, arr: any[]) => {
    let array: any[] = []
    arr.map((data: any, i_: number)=> {
        if(i != i_)
            array.push(data)
    })
    return array
}

const Find = () => {
    const [data, setData] = useState<find | null>(null)
    const [words, setWords] = useState<Array<string>>([])
    const [exportData, setExportData] = useState<string>("")
    const router = useRouter()
    /*useEffect(()=> {
        console.log(saveObject(findCreateExample))
    },[])*/
    useEffect(()=> {
        try {
            const path = router.query.data
            if(!path || Array.isArray(path))
                return
            const json = loadObject(path)
            if(json.x && json.y && Array.isArray(json.data) && Array.isArray(json.words)) {
                setData({
                    x: json.x,
                    y: json.y,
                    data: json.data
                })
                setWords(json.words)
            }
        } catch(e) {}
    },[router])
    return <div className={styles.container_create}>
        <FindComponent data={data} />
        <div>
            <button onClick={()=> {
                if(!data)
                    return
                setData((data: find | null)=> {
                    if(!data)
                        return null
                    return {
                        data: findGenerator(words, data?.x, data?.y),
                        x: data.x,
                        y: data.y
                    }
                })
            }} className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="42" height="42" viewBox="0 0 24 24" stroke-width="2" stroke="#0070f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
            </button>
            <input className={styles.button_textarea} type="text" value={exportData}  />
            <button onClick={()=> {
                try {
                    if(!data)
                        return
                    const data_: findCreate = {
                        x: data.x,
                        y: data.y,
                        data: data.data,
                        words: words
                    }
                    const json = saveObject(data_)
                    setExportData(json)
                } catch (e) {}
            }} className={styles.button}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-writing" width="42" height="42" viewBox="0 0 24 24" stroke-width="2" stroke="#0070f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
                    <path d="M16 7h4" />
                    <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
                </svg>
            </button>
            <button onClick={()=> {
                window.open(`/play/find?data=${exportData}`, "create");
            }} className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-up" width="42" height="42" viewBox="0 0 24 24" stroke-width="2" stroke="#0070f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="16" y1="9" x2="12" y2="5" />
                    <line x1="8" y1="9" x2="12" y2="5" />
                </svg>
            </button>
        </div>
        <div>
        <input onChange={(e: any)=> {
                if(!data) return
                setData((data: find | null)=> {
                    if(!data) return null
                    return {data: data.data,x: Number(e.target.value),y: data.y}
                })
            }} type="number" value={data?.x} />
            <input onChange={(e: any)=> {
                if(!data) return
                setData((data: find | null)=> {
                    if(!data) return null
                    return {data: data.data,x: data.x,y: Number(e.target.value)}
                })
            }} type="number" value={data?.y} />
        </div>
        {words.map((word: string, i:number)=> <div key={i}>
            <input type="text" value={words[i]} onChange={(e: any)=> {
                setWords((words_: Array<string>) => setArray(i, e.target.value, words_))
            }} />
            <button onClick={(e: any)=> {
                setWords((words_: Array<string>) => deleteArray(i, words_))
            }}>delete</button>
        </div>)}
        <button onClick={()=> {
            setWords((words_: Array<string>) => [...words_, ""])
        }}>add</button>
    </div>
}
export default Find