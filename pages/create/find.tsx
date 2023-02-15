import { FindComponent } from "@/components/find"
import { find, findCreate, findCreateExample, findExample } from "@/lib/type"
import { useEffect, useState } from "react"
import styles from "@/pages/scss/find.module.scss"
import { useRouter } from "next/router"
import { loadObject, saveObject } from "@/lib/save"
import { findGenerator, findRandomGenerator } from "@/lib/find"

const setArray = (i: number, data: any, arr: any[]) => {
    const array = arr.concat().map((data_: any, i_: number)=> i == i_ ? data : data_ )
    //let array = arr.concat()
    //arr[i] = dataではダメなのかな?
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
    const [wordsLength, setWordsLength] = useState(0)
    const [level, setLevel] = useState(0)
    const router = useRouter()
    /*useEffect(()=> {
        console.log(saveObject(findCreateExample))
    },[])*/
    useEffect(()=> {
        if(data)
            return
        setData({
            data: [...new Array(4)].map(()=> " ".repeat(10)),
            x: 10,
            y: 4
        })
        setWordsLength(20)
        let array = new Array(Number(20))
        for (let i = 0; i < array.length; i++) {
            array[i] = ""
        }
        setWords(array)
    },[])
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
    useEffect(()=> {
        setWordsLength(words.length)
    },[words])
    if(!data)
        return <div />
    return <div className={styles.container_create}>
        <FindComponent data={data} />
        <div style={{marginBottom: -8}}>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="#0070f3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
            </button>
            <input onChange={()=> {

            }} className={styles.button_textarea} type="text" value={exportData}  />
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
            }} className={styles.button}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-writing" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="#0070f3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
                    <path d="M16 7h4" />
                    <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
                </svg>
            </button>
            <button onClick={()=> {
                window.open(`/kanji-puzzle/play/find?data=${exportData}`, "create");
            }} className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-up" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="#0070f3" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
            }} type="number" value={data?.x} className={styles.button_number} />
            <input onChange={(e: any)=> {
                if(!data) return
                setData((data: find | null)=> {
                    if(!data) return null
                    return {data: data.data,x: data.x,y: Number(e.target.value)}
                })
            }} type="number" value={data?.y} className={styles.button_number} />
        </div>
        <div style={{
            display: "flex",
        }}>
            <button onClick={()=> {
                if(!data)
                    return
                setWords(findRandomGenerator(words.length, level))
            }} className={styles.button} style={{marginBottom: 16}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-book" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="#0070f3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                    <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                    <line x1="3" y1="6" x2="3" y2="19" />
                    <line x1="12" y1="6" x2="12" y2="19" />
                    <line x1="21" y1="6" x2="21" y2="19" />
                </svg>
            </button>
            <button onClick={()=> {
                try {
                    let array = new Array(Number(wordsLength))
                    for (let i = 0; i < array.length; i++) {
                        array[i] = ""
                    }
                    setWords(array)
                } catch (e) {}
            }} className={styles.button} style={{marginBottom: 16}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="9" y1="6" x2="20" y2="6" />
                    <line x1="9" y1="12" x2="20" y2="12" />
                    <line x1="9" y1="18" x2="20" y2="18" />
                    <line x1="5" y1="6" x2="5" y2="6.01" />
                    <line x1="5" y1="12" x2="5" y2="12.01" />
                    <line x1="5" y1="18" x2="5" y2="18.01" />
                </svg>
            </button>
            <input onChange={(e: any)=> {
                setWordsLength(e.target.value)
            }} type="number" value={wordsLength} className={styles.button_number} />
            <button onClick={()=> {
                try {
                    if(!data)
                        return
                    const words_ = findRandomGenerator(wordsLength, level)
                    const data_data_ = findGenerator(words_, data.x, data.y)
                    const data_: findCreate = {
                        x: data.x,
                        y: data.y,
                        data: data_data_,
                        words: words_
                    }
                    const json = saveObject(data_)
                    window.open(`/kanji-puzzle/play/find?data=${json}`, "create");
                } catch (e) {}
            }} className={styles.button} style={{marginBottom: 16}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-apple-arcade" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="5" r="2" />
                    <path d="M20 12.5v4.75a0.734 .734 0 0 1 -.055 .325a0.704 .704 0 0 1 -.348 .366l-5.462 2.58a4.998 4.998 0 0 1 -4.27 0l-5.462 -2.58a0.705 .705 0 0 1 -.401 -.691l-.002 -4.75" />
                    <path d="M4.431 12.216l5.634 -2.332a5.065 5.065 0 0 1 3.87 0l5.634 2.332a0.692 .692 0 0 1 .028 1.269l-5.462 2.543a5.064 5.064 0 0 1 -4.27 0l-5.462 -2.543a0.691 .691 0 0 1 .028 -1.27z" />
                    <line x1="12" y1="7" x2="12" y2="13" />
                </svg>
            </button>
        </div>
        <div>
            <input onChange={(e: any)=> {
                    setLevel(e.target.value)
            }} type="number" value={level} className={styles.button_number} />
        </div>
        {words.map((word: string, i:number)=> <div className={styles.input_word} key={i}>
            <input className={styles.button_word} type="text" value={words[i]} onChange={(e: any)=> {
                setWords((words_: Array<string>) => setArray(i, e.target.value, words_))
            }} />
            <button onClick={(e: any)=> {
                setWords((words_: Array<string>) => deleteArray(i, words_))
            }} className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="#e00" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>)}
        <button onClick={()=> {
            setWords((words_: Array<string>) => [...words_, ""])
        }} className={styles.button}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="42" height="42" viewBox="0 0 24 24" strokeWidth="2" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
    </div>
}
export default Find