import { useAtom } from "jotai";
import { gambleCount} from "./AtomVariable";
import { useMemo } from "react";

export default function Counter(){

    const [gambles, _] = useAtom(useMemo(() => {
        return gambleCount;
    }, []))

    return (
        <section className="counter">
            <p>You've gambled <span style={{color:"white", fontSize:"5rem",fontStyle:"italic"}}>{gambles}</span> times</p>
        </section>
    )

}