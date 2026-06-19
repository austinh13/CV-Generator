import { useState } from "react";

export default function Projects({ addProject }) {
    const [form, setForm] = useState({
        name: "",
        technologies: "",
        sDate: "",
        eDate: "",
        descrip: ""
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject(form);
        setForm({ name: "", technologies: "", sDate: "", eDate: "", descrip: "" }); // reset
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field">
                <label className="field-label" htmlFor="proj-name">Project name</label>
                <input
                    id="proj-name"
                    type="text"
                    placeholder="Gitlytics"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="proj-tech">Technologies used (optional)</label>
                <input
                    id="proj-tech"
                    type="text"
                    placeholder="Python, Flask, React, PostgreSQL"
                    value={form.technologies}
                    onChange={(e) => handleChange("technologies", e.target.value)}
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="proj-descrip">Description</label>
                <textarea
                    id="proj-descrip"
                    placeholder="Built a full-stack app that..."
                    maxLength={150}
                    rows={3}
                    value={form.descrip}
                    onChange={(e) => handleChange("descrip", e.target.value)}
                    required
                />
                <span className="field-char-count">{form.descrip.length}/150</span>
            </div>

            <div className="field-row">
                <div className="field">
                    <label className="field-label" htmlFor="proj-start">Start date</label>
                    <input
                        id="proj-start"
                        type="date"
                        value={form.sDate}
                        onChange={(e) => handleChange("sDate", e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="field-label" htmlFor="proj-end">End date</label>
                    <input
                        id="proj-end"
                        type="date"
                        value={form.eDate}
                        onChange={(e) => handleChange("eDate", e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-footer">
                <button type="submit" className="btn btn-primary">Add project</button>
            </div>
        </form>
    )
}
