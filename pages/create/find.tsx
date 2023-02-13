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
        }}>generate</button>
        <input type="text" value={exportData}  />
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
        }}  >export</button>
        <button onClick={()=> {
            window.open(`/play/find?data=${exportData}`, "create");
        }}>open new tab</button>
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