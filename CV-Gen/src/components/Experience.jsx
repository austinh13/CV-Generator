
import { useState } from "react";

export default function Experience({ addEducation }){
    const [isOpen, setIsOpen] = useState(false);

    const [form, setForm] = useState({
        company: "",
        job: "",
        address: "",
        sDate: "",
        eDate: "",
        descrip: ""
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        //addEducation(form);
        setForm({ degree: "", school: "",city: "", sDate: "", eDate: "", gpa: "" }); // reset
    };

    return(
        <div className = "experienceInfo">
            <button id = "educationButton" 
            onClick={() => setIsOpen(!isOpen)}
            >
                Experience
            </button>
            <div className={`educationContent ${isOpen ? "show" : "hide"}`}>
                <form className="formGeneral" onSubmit={handleSubmit}>
                    <p>Company</p>
                    <input
                        type="text"
                        value={form.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                    >
                    </input>
                    <p>Job Title</p>
                    <input
                        type = "text"
                        value={form.job}
                        onChange={(e) => handleChange("job",e.target.value)}
                        required
                    >
                    </input>
                    <p>Address</p>
                    <input
                        type = "text"
                        value={form.address}
                        onChange={(e) => handleChange("address",e.target.value)}
                        required
                    >
                    </input>
                    <p>Short Description</p>
                    <input
                        type = "text"
                        value={form.descrip}
                        onChange={(e) => handleChange("descrip",e.target.value)}
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

