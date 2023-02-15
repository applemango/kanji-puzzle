import { WadouComponent } from "@/components/wadou"
import { wadou } from "@/lib/type"
import { useEffect, useState } from "react"
import stylesA from "@/pages/scss/all.module.scss"
import styles from "@/pages/scss/wadou.module.scss"
import { useRouter } from "next/router"
import { loadObject } from "@/lib/save"
import { wadouRandomGenerator } from "@/lib/wadou"

const Wadou = () => {
    const [data, setData] = useState<wadou | null>(null)
    const router = useRouter()
    useEffect(()=> {
        if(data)
            return
        setData({words: ["","","",""], correct: ""})
    },[])
    useEffect(()=> {
        try {
            const path = router.query.data
            if(!path || Array.isArray(path))
                return
            const json = loadObject(path)
            if(Array.isArray(json.words) && json.correct && json.type)
                setData(json)
        } catch(e) {}
    },[router])
    if(!data)
        return <div />
    return <div style={{
        minHeight: "100vh",
        width: "fit-content",
        margin: "0 auto",
        paddingTop: 24
    }}>
        <WadouComponent create data={data} />
        {data.words.map((word: string, i: number)=> <div>
            <input type="text" value={data.words[i]} onChange={(e: any)=> {
                setData((d: wadou | null): wadou | null=> {
                    if(!d)
                        return null
                    const x_: any = [...d.words.map((x: string, i_: number)=> i==i_ ? e.target.value : x)]
                    return {
                        words: x_,
                        correct: d.correct,
                    }
                })
            }} />
        </div>)}
        <div>
            <div>
                <input type="text" value={data.correct} onChange={(e: any)=> {
                    setData((d: wadou | null): wadou | null => {
                        if(!d)
                            return null
                        return {
                            words: d.words,
                            correct: e.target.value,
                        }
                    })
                }} />
            </div>
        </div>
        <button onClick={()=> {
            setData(wadouRandomGenerator())
        }}>random</button>
    </div>
}
export default Wadou