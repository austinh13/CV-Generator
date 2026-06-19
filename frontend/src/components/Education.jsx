import { useState } from "react";

export default function Education({ addEducation }) {
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
        setForm({ degree: "", school: "", city: "", sDate: "", eDate: "", gpa: "" }); // reset
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field">
                <label className="field-label" htmlFor="edu-school">School</label>
                <input
                    id="edu-school"
                    type="text"
                    placeholder="University of Texas"
                    value={form.school}
                    onChange={(e) => handleChange("school", e.target.value)}
                    required
                />
            </div>

            <div className="field-row">
                <div className="field">
                    <label className="field-label" htmlFor="edu-degree">Degree</label>
                    <input
                        id="edu-degree"
                        type="text"
                        placeholder="B.S. Computer Science"
                        value={form.degree}
                        onChange={(e) => handleChange("degree", e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="field-label" htmlFor="edu-city">City, state</label>
                    <input
                        id="edu-city"
                        type="text"
                        placeholder="Austin, TX"
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="field field-narrow">
                <label className="field-label" htmlFor="edu-gpa">GPA (optional)</label>
                <input
                    id="edu-gpa"
                    type="text"
                    placeholder="3.8"
                    value={form.gpa}
                    onChange={(e) => handleChange("gpa", e.target.value)}
                />
            </div>

            <div className="field-row">
                <div className="field">
                    <label className="field-label" htmlFor="edu-start">Start date</label>
                    <input
                        id="edu-start"
                        type="date"
                        value={form.sDate}
                        onChange={(e) => handleChange("sDate", e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="field-label" htmlFor="edu-end">End date</label>
                    <input
                        id="edu-end"
                        type="date"
                        value={form.eDate}
                        onChange={(e) => handleChange("eDate", e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-footer">
                <button type="submit" className="btn btn-primary">Add education</button>
            </div>
        </form>
    )
}
