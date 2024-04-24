import { useAtom } from "jotai";
import { cookieCount, gambleMultiplicator } from "./AtomVariable";
import {useState, useRef, useEffect} from 'react'

export default function GambUpgrades(props){

    const [cookie, setCookie] = useAtom(cookieCount);
    const [gambMulti, setGambMulti] = useAtom(gambleMultiplicator);
    const [reqPerUpdate, setReqPerUpdate] = useState(props.baseprice);
    const [count, setCount] = useState(0);

    const button = useRef(null)

    const upgradeRate = props.urate;
    const rate = props.rate;

    useEffect(() => {
        
        if (cookie >= reqPerUpdate){
            button.current.style.opacity = 1
        } else {
            button.current.style.opacity = 0.2;
        }
    
    })

    function buy(){

        if (reqPerUpdate > cookie){return;}

        setCookie(c => c - reqPerUpdate);
        setCount(c => c + 1);
        setReqPerUpdate(c => (c * upgradeRate).toFixed(0));
        setGambMulti(c => c * rate);
        return;

    }



    return (
        <div ref={button} className="g-upgrade" onClick={() => buy()}>
            <h1>{props.title}</h1>
            <h2>{count}</h2>
            <h3>{reqPerUpdate}</h3>
        </div>
    )

}