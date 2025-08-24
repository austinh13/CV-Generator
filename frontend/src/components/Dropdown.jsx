import { useState } from "react";

export default function Dropdown({title,children}){
    const[isOpen, setIsOpen] = useState(false);

    return(
        <div className = "tab">
            <button onClick = {() => setIsOpen(!isOpen)} className = "button">
                {title} {isOpen ? "▲" : "▼"}
            </button>
            {isOpen && children}
        </div>
        
    );
}

