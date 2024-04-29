import { useAtom } from "jotai";
import {useState, useRef, useEffect, useMemo} from 'react'
import { cookieCount, gambleCount, gambleMultiplicator } from "./AtomVariable";
import GambUpgrades from "./GambleUpgrades";

export default function Gamble(){

    const gamblePrice = 50;

    const [cookie, setCookieCount] = useAtom(cookieCount);
    const [gamble, setGamble] = useAtom(gambleCount)
    const [gambleMultip, setGambleMultip] = useAtom(useMemo(() => {return gambleMultiplicator},[]))
    
    const [gambledValue, setGambledValue] = useState(0)
    const [reward, setReward] = useState(0)
    const [displayed, setDisplayed] = useState(false)
    const [rewColor, setRewColor] = useState("green")
    const [boughtGambling, setBoughtGambling] = useState(false)
    const [unlockGambleText, setUnlockGambleText] = useState(`? ${gamblePrice} ?`)

    const menu = useRef(null)
    const slider = useRef(null)
    const rew = useRef(null)
    const token = useRef(null)
    const toGamble = useRef(null)
    const gamblingMenu = useRef(null)

    useEffect(() => {
        (cookie >= gamblePrice) ? toGamble.current.style.opacity = 1 : null
    })

    function gambling(){
        if (displayed){
            menu.current.style.opacity = 0;
            rew.current.style.opacity = 0;
            setDisplayed(false)
            return;
        }
        if (cookie >= gamblePrice && !boughtGambling){
            setCookieCount(c => c - gamblePrice);
            setBoughtGambling(true)
            setUnlockGambleText("Gamble !")
            toGamble.current.style.opacity = 1;
        }
        if (!boughtGambling){
            return;
        }
        menu.current.style.opacity = 1;
        setDisplayed(true)  
        console.log("wtf")    
    }
    function generate(){
        const Gamble = gamble +1 
        const val = slider.current.value;
        if (val <= 0){return;}
        rew.current.style.opacity = 1;
        setCookieCount(c => c - val)
        let t = 0;
        let memo;
        let deg = 10;
        const interval = setInterval(() => {
            const r = Math.floor(Math.random() * (val*gambleMultip*2) - val*gambleMultip*0.2) 
            setReward(r)
            token.current.style.transform = `rotate(${deg}deg)`;
            deg += 10;
            r > 0 ? setRewColor("green") : setRewColor("red");
            t += 1
            memo = r
            if (t > 30){
                clearInterval(interval);
                return
            }
        }, 50)
        setTimeout(() => {
            setCookieCount(c => c + memo)
            setGamble(c => c + 1)  
            slider.current.value = 0
            setGambledValue(0)      
            }, 2000)
     
    }

    function displayUpgrades(){
        if (gamblingMenu.current.style.opacity == 1){
            gamblingMenu.current.style.opacity = 0;
            return
        } else {
            gamblingMenu.current.style.opacity = 1;
            return 
        }

    }


    return(
        <div className="gambling">
            <button ref={toGamble} className="to-gamble" onClick={() => gambling()}>{unlockGambleText}</button>
            <p ref={rew}><span style={{fontSize:"5rem", color: rewColor}}>{reward}</span> earned ! </p>
            <div ref={menu} className="menu">
                <input className="slider" ref={slider} type="range" min={0} max={cookie} onChange={() => setGambledValue(slider.current.value < cookie ? slider.current.value : "All-in")}/>
                <h4><span style={{fontSize:"5rem",color:"green"}}>{gambledValue}</span> on the table ! x<span style={{color:"green"}}>{gambleMultip.toFixed(2)}</span> </h4>
                <img ref={token} className="generator" onClick={() => generate()} src="https://png.pngtree.com/png-vector/20220729/ourmid/pngtree-poker-chip-png-image_6091092.png"></img>
                <button className="display-menu" onClick={() => displayUpgrades()}>Upgrades</button>
                <div ref={gamblingMenu} style={{display:"flex",flexDirection:"column", alignItems:"center",gap:"2vh", width:"80%", opacity:"0", transition:"all 500ms"}}>
                    <GambUpgrades title="BlackJack" baseprice={20} urate={2.3} rate={1.2}/>
                    <GambUpgrades title="Russians" baseprice={250} urate={3.14} rate={1.66}/>
                    <GambUpgrades title="Italian Mafia" baseprice={1000} urate={5.5} rate={3.5}/>
                </div>
            </div>
        </div>
    )

}
