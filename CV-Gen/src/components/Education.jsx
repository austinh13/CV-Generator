import { useState } from "react";

export default function Education({formData,handleEducation}){
      const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }
    return(
        <div className = "educationInfo">
            <button id = "educationButton" 
            onClick={() => setIsOpen(!isOpen)}
            >
                Education
            </button>
            <div className={`educationContent ${isOpen ? "show" : "hide"}`}>
                <form className="formGeneral" onSubmit={handleSubmit}>
                    <p>Degree</p>
                    <input
                        type = "text"
                        onChange={(e) => handleEducation("degree",e.target.value)}
                        required
                    >
                    </input>
                    <p>School</p>
                    <input
                        type = "text"
                        onChange={(e) => handleEducation("school",e.target.value)}
                        required
                    >
                    </input>
                    <div className = "dates">
                        Start 
                        <input
                        type = "date"
                        onChange={(e) => handleEducation("sDate",e.target.value)}
                        required
                        ></input>
                        End
                        <input
                        type = "date"
                        onChange={(e) => handleEducation("eDate",e.target.value)}
                        required
                        ></input>
                    </div>
                    <button
                    type="submit">
                    Submit
                    </button>
                </form>
            </div>
            
        </div>
    )
}