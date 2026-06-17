import { useState } from "react";
import { Sparkle } from "@phosphor-icons/react";
import { rewriteDescription, findJob } from "../utils/jobHelpers";

export default function Experience({ addExp }){
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
        <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field-row">
                <div className="field">
                    <label className="field-label" htmlFor="exp-job">Job title</label>
                    <input
                        id="exp-job"
                        type="text"
                        placeholder="Software Engineer"
                        value={form.job}
                        onChange={(e) => handleChange("job", e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="field-label" htmlFor="exp-company">Company</label>
                    <input
                        id="exp-company"
                        type="text"
                        placeholder="Acme Robotics"
                        value={form.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="field-label" htmlFor="exp-address">Location</label>
                <input
                    id="exp-address"
                    type="text"
                    placeholder="Remote · Austin, TX"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="exp-descrip">Description</label>
                <p className="field-help">Type your own, or type "suggested" for a description based on your job title.</p>
                <textarea
                    id="exp-descrip"
                    placeholder="Led a team of 4 to ship a new onboarding flow..."
                    maxLength={150}
                    rows={3}
                    value={form.descrip}
                    onChange={(e) => handleChange("descrip", e.target.value)}
                    required
                />
                <span className="field-char-count">{form.descrip.length}/150</span>
            </div>

            <div className="toggle-row">
                <span className="toggle-row-icon">
                    <Sparkle size={16} weight="fill" />
                </span>
                <div className="toggle-row-text">
                    <span className="toggle-row-title">Polish with AI</span>
                    <span className="toggle-row-desc">
                        Rewrites your description for stronger phrasing. The first request in a while can take a minute or two while the server wakes up.{" "}
                        <a href="https://austinh.vercel.app/" target="_blank" rel="noreferrer">See a demo</a>
                    </span>
                </div>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={decision}
                        onChange={() => setDecision(!decision)}
                        aria-label="Polish description with AI"
                    />
                    <span className="switch-track"></span>
                    <span className="switch-thumb"></span>
                </label>
            </div>

            <div className="field-row">
                <div className="field">
                    <label className="field-label" htmlFor="exp-start">Start date</label>
                    <input
                        id="exp-start"
                        type="date"
                        value={form.sDate}
                        onChange={(e) => handleChange("sDate", e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="field-label" htmlFor="exp-end">End date</label>
                    <input
                        id="exp-end"
                        type="date"
                        value={form.eDate}
                        onChange={(e) => handleChange("eDate", e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-footer">
                <button type="submit" className="btn btn-primary">Add experience</button>
            </div>
        </form>
    )
}
