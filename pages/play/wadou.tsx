import { WadouComponent } from "@/components/wadou"
import { kanji, kanjiYomi } from "@/lib/kanji"
import { loadObject, saveObject } from "@/lib/save"
import { wadou, wadouExample } from "@/lib/type"
import { kanjiFilter } from "@/lib/utils/kanji"
import stylesA from "@/pages/scss/all.module.scss"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Wadou = () => {
    //const x = "花"
    //console.log(kanjiFilter((k: string)=> k[0] == x))
    //console.log(kanjiFilter((k: string)=> k[1] == x))
    //console.log(saveObject(wadouExample))
    const[inputData, setInputData] = useState<string>("")
    const [data, setData] = useState<wadou | null>(null)
    const router = useRouter()

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
        return <div>
            <input value={inputData} onChange={(e: any)=> setInputData(e.target.value)} type="text" />
            <button onClick={()=> {
                try {
                    const json = loadObject(inputData)
                    if(Array.isArray(json.words) && json.correct && json.type)
                        setData(json)
                } catch (e) {}
            }}>create</button>
        </div>
    return <div style={{minHeight: "100vh"}} className={stylesA.play}>
        <WadouComponent data={data} />
    </div>
}
export default Wadou