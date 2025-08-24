
import { useState } from "react";

export default function Education({ addEducation }){
    const [isOpen, setIsOpen] = useState(false);

    const [form, setForm] = useState({
        degree: "",
        school: "",
        city: "",
        sDate: "",
        eDate: "",
        gpa: ""
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        addEducation(form);
        setForm({ degree: "", school: "",city: "", sDate: "", eDate: "", gpa: "" }); // reset
    };

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
                        type="text"
                        value={form.degree}
                        onChange={(e) => handleChange("degree", e.target.value)}
                        required
                    >
                    </input>
                    <p>School</p>
                    <input
                        type = "text"
                        value={form.school}
                        onChange={(e) => handleChange("school",e.target.value)}
                        required
                    >
                    </input>
                    <p>City, State</p>
                    <input
                        type = "text"
                        value={form.city}
                        onChange={(e) => handleChange("city",e.target.value)}
                        required
                    >
                    </input>
                    <p>GPA</p>
                    <input
                        type = "text"
                        value={form.gpa}
                        onChange={(e) => handleChange("gpa",e.target.value)}
                        required
                    >
                    </input>
                    <div className = "dates">
                        Start 
                        <input
                        type = "date"
                        value={form.sDate}
                        onChange={(e) => handleChange("sDate",e.target.value)}
                        required
                        ></input>
                        End
                        <input
                        type = "date"
                        value={form.eDate}
                        onChange={(e) => handleChange("eDate",e.target.value)}
                        required
                        ></input>
                    </div>
                    <button type="submit" id = "generalSubmit">
                    Submit
                    </button>
                </form>
            </div>
            
        </div>
    )
}

