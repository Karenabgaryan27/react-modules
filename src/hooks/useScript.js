import React,{useEffect} from 'react'

export default function useScript({url}) {
 useEffect(()=>{
    const script = document.createElement('script')
    script.type="text/jsx"
    script.async = true 
    script.src = url
    document.body.appendChild(script)
    return () =>{
        document.body.removeChild(script)
    }
 },[url])
}
