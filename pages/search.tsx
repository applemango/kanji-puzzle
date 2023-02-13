import { kanji } from "@/lib/kanji"
import { useEffect, useState } from "react"

const Search = () => {
    const [query, setQuery] = useState("")
    const [result, setResult] = useState<Array<string>>([])
    return <div>
        <div>
            <input type="text" value={query} onChange={(e: any)=> {
                setQuery(e.target.value)
            }}/>
            <button onClick={()=> {
                setResult(kanji.filter((k: string, i: number)=> {
                    if(k[1] == query)
                        return true
                    return false
                }))
            }}>last search</button>
            <button onClick={()=> {
                setResult(kanji.filter((k: string, i: number)=> {
                    if(k[0] == query)
                        return true
                    return false
                }))
            }}>first search</button>
        </div>
        <div>
            {result.map((result: string, i: number)=> <div key={i}>
                {result}
            </div>)}
        </div>
    </div>
}
export default Search