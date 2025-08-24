
import { useState } from "react";
import jobs from '../jobs.json'; // Import jobs if not already

async function rewriteDescription(description) {
  const res = await fetch("http://localhost:3000/api/rewrite-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
  }

  return data.rewritten || description;

}

export function findJob(title) {
  const lowerTitle = title.toLowerCase();
  return jobs.find(job => {
    const jobTitle = job.title.toLowerCase();
    return jobTitle.includes(lowerTitle) || jobTitle.includes(lowerTitle + "s");
  });
}

export default function Experience({ addExp }){
    const [isOpen, setIsOpen] = useState(false);

    const [decision,setDecision] = useState(false);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        let description = form.descrip;

        if (form.descrip.toLowerCase() === "suggested") {
            const jobMatch = findJob(form.job);
            description = jobMatch?.description || "No description found!";
        } 
        else if(decision){
            description = await rewriteDescription(form.descrip);
        }
        else {
            description = form.descrip;
        }

        addExp({ ...form, descrip: description });
        setForm({ company: "", job: "", address: "", sDate: "", eDate: "", descrip: "" });
    };

    return(
        <div className = "experienceInfo">
            <button id = "educationButton" 
            onClick={() => setIsOpen(!isOpen)}
            >
                Experience
            </button>
            <div className={`expContent ${isOpen ? "show" : "hide"}`}>
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
                    <textarea
                        id="jobDescrip"
                        placeholder="Type: Suggested for suggested description (not all jobs guaranteed) OR type your own under 150 Characters"
                        maxLength={150}
                        rows={3}         // how tall it is
                        cols={20}        // how wide it is
                        value={form.descrip}
                        onChange={(e) => handleChange("descrip", e.target.value)}
                        required
                    />
                    <p>Use AI to improve job description</p>
                    <input
                        id = "aiChecker"
                        type="checkbox"
                        checked={decision}
                        onChange={() => setDecision(!decision)}
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

