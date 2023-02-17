import { useEffect, useState } from "react"
import stylesA from "@/pages/scss/all.module.scss"

const Accordion = ({children, defaultValue = false, open, setOpen, title = "open"}:{
    children: any,
    defaultValue?: boolean,
    open?: boolean,
    setOpen?: Function,
    title?: string
}) => {
    const [open_, setOpen_] = useState(defaultValue)
    useEffect(()=> setOpen_(defaultValue),[])
    useEffect(()=> {if(open === undefined || open == open_)return;setOpen_(open)}, [open])
    return <div className={stylesA.accordion}>
        <div onClick={()=> {
            setOpen_((open_)=> {
                if(setOpen)
                    setOpen(!open_)
                return !open_
            })
        }}>
            <p>{title}</p>
        </div>
        {open_ && <div>
            {children}
        </div>}
    </div>
}
export default Accordion