import { find, findCreate, findExample } from "@/lib/type"
import { useEffect, useState } from "react"
import styles from "@/pages/scss/find.module.scss"

import { loadObject, saveObject } from "@/lib/save"
import { useRouter } from "next/router"
import { FindComponent, FindPlayComponent } from "@/components/find"

const Find = () => {
    const[inputData, setInputData] = useState<string>("")
    const [data, setData] = useState<findCreate | null>(null)
    const router = useRouter()

    useEffect(()=> {
        try {
            const path = router.query.data
            if(!path || Array.isArray(path))
                return
            const json = loadObject(path)
            if(json.x && json.y && Array.isArray(json.data))
                setData(json)
        } catch(e) {}
    },[router])
    if(!data)
        return <div>
            <input value={inputData} onChange={(e: any)=> setInputData(e.target.value)} type="text" />
            <button onClick={()=> {
                try {
                    const json = loadObject(inputData)
                    if(json.x && json.y && json.data && json.words)
                        setData(json)
                } catch (e) {}
            }}>create</button>
        </div>
    return <div className={styles.container}>
        <FindPlayComponent data={data} />
    </div>
}
export default Find