import { useEffect, useRef, useState } from "react";
import { cookieCount, rangeMin, rangeMax} from "./AtomVariable";
import { useAtom } from "jotai";

export default function GeneralUpgrade(props){

    const button = useRef(null);

    const [totalCount, setTotalCount] = useAtom(cookieCount);
    const [cMin, setMin] = useAtom(rangeMin);
    const [cMax, setMax] = useAtom(rangeMax)

    const [cookiesRequired, setCookieRequired] = useState(props.baseprice);
    const [count, setCount] = useState(0);
    const [cookiePerUpgrade, setCookiePerUpgrade] = useState(props.basegain);

    useEffect(() => {
        
        if (totalCount >= cookiesRequired){
            button.current.style.opacity = 1
        } else {
            button.current.style.opacity = 0.2;
        }
    
    })

    function update(){
        if (totalCount >= cookiesRequired){
            setTotalCount(t => t - cookiesRequired);
            setCount(c => c + 1);
            setMin(c => c - Number(cookiePerUpgrade / 2))
            setMax(c => c + Number(cookiePerUpgrade))
            setCookieRequired(c => (c * props.urate).toFixed(0));
            setCookiePerUpgrade(c => (c * props.rate * 0.9).toFixed(0));
            return;

        }
    }

    return(
        <button ref={button} onClick={() => update()} className="general-upg" style={{backgroundImage:`url(${props.image})`}}>
            <h1>{props.name}</h1>
            <h2>{count}</h2>
            <p>{cookiesRequired}</p>
        </button>
    )

}