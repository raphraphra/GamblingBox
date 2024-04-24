import { headlines } from "./headlines"

export default function Header(){
    return(
        <div className="header">
            {headlines[0].text}
        </div>

    )
}