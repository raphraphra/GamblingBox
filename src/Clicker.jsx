import { useAtom } from "jotai";
import { cookieCount, cookiePerClick, rangeMax, rangeMin, cookiePerSecond} from "./AtomVariable";
import {useEffect, useMemo, useState } from "react";
import { useRef} from 'react';

export default function Clicker(){

    const [cookie, setCookie] = useAtom(cookieCount);

    const [PerSecond, setCookiePerSecond] = useAtom(useMemo(() => {
        return cookiePerSecond;
    },[]));

    const [cMin, __] = useAtom(useMemo(() => {
        return rangeMin;
    },[]));

    const [cMax, ___] = useAtom(useMemo(() => {
        return rangeMax;
    },[]));

    const [PerClick, setCookiePerClick] = useAtom(useMemo(() => {
        return cookiePerClick;
    },[]));

    const cookieImage = useRef(null);
    const indicator = useRef(null);
    const cookieCounter = useRef(null);
    const [deg, setDeg] = useState(0);

    const display = () => {
        let t = 0
        indicator.current.style.opacity = 1;
        PerClick > 0 ? indicator.current.style.color = "#A8CD9F" : indicator.current.style.color = "#FA7070";
        indicator.current.style.display = 'block';
        indicator.current.style.top = `${Math.floor(Math.random() * 100) + 500}px`;
        indicator.current.style.right = `${Math.floor(Math.random() * 100) + 350}px`;
        indicator.current.style.left = `${Math.floor(Math.random() * 100) + 150}px`;
   
        const interval = setInterval(() => {
            indicator.current.style.opacity -= 0.05;
                t += 0.05   
            if (t >= 1){
                clearInterval(interval);
                return;
            }
        }, 40);

    }

    function Clicked(){
        let returnColor;
        let sizeIncrease;
        const added = Math.floor(Math.random() * (Number(cMax)+ Math.abs(Number(cMin))) + Number(cMin))
        setCookiePerClick(added)
        setCookie(c => c + PerClick);
        if (PerClick >= 0) {
            returnColor = "green";
            sizeIncrease = 0.5;
        }
        else {
            returnColor = "red";
            sizeIncrease = 1.5;
        }
        cookieCounter.current.style.fontSize = `${4+sizeIncrease}rem`;
        cookieCounter.current.style.color = returnColor;
        setTimeout(() => {
            cookieCounter.current.style.fontSize = "4rem";
            cookieCounter.current.style.color = "white";
        }, 100);
        display();
        setDeg(c => c + 5)
        
        cookieImage.current.style.transform = `rotate(${deg}deg)`
    }

    

    return (
        <div className="cookie-box">
            <img ref={cookieImage} onClick={() => Clicked()} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25d45014-8cc3-4c98-b02c-5a0cf3a55ddd/dcpne01-ba5bdb1d-568b-4101-8b1f-e54eaf2ad299.png/v1/fill/w_1024,h_831/roulette_for_casino_on_a_transparent_background__by_prussiaart_dcpne01-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI1ZDQ1MDE0LThjYzMtNGM5OC1iMDJjLTVhMGNmM2E1NWRkZFwvZGNwbmUwMS1iYTViZGIxZC01NjhiLTQxMDEtOGIxZi1lNTRlYWYyYWQyOTkucG5nIiwiaGVpZ2h0IjoiPD04MzEiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC8yNWQ0NTAxNC04Y2MzLTRjOTgtYjAyYy01YTBjZjNhNTVkZGRcL3BydXNzaWFhcnQtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.uioKuUmfsYZppDdSp9TK9pogstakLDWOxxGoUYAN2Ss" alt="No cookie" />
            <span ref = {indicator} style={{display:"none",margin : "1vh", fontSize:"5rem", opacity:"0", position : "absolute"}}><b>{PerClick >= 0 ? "+" : "-"} {Math.abs(PerClick)} !</b></span>
            <p ><span ref={cookieCounter} style={{fontSize:"4rem",fontStyle:"italic"}}>{cookie}</span> <span style={{color:"crimson",fontSize:"3rem"}}>tokens</span></p>
            <p className="counter">{cMin} ~ {cMax} tokens per click ! </p>
        </div>
    )

}