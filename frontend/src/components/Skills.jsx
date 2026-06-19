export default function Skills({ skillsData, handleSkillsChange }) {
    return (
        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
                <label className="field-label" htmlFor="skills-languages">Languages</label>
                <input
                    id="skills-languages"
                    type="text"
                    placeholder="Java, Python, C/C++, SQL, JavaScript"
                    value={skillsData.languages}
                    onChange={(e) => handleSkillsChange("languages", e.target.value)}
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="skills-frameworks">Frameworks</label>
                <input
                    id="skills-frameworks"
                    type="text"
                    placeholder="React, Node.js, Flask, FastAPI"
                    value={skillsData.frameworks}
                    onChange={(e) => handleSkillsChange("frameworks", e.target.value)}
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="skills-tools">Developer tools</label>
                <input
                    id="skills-tools"
                    type="text"
                    placeholder="Git, Docker, VS Code, IntelliJ"
                    value={skillsData.developerTools}
                    onChange={(e) => handleSkillsChange("developerTools", e.target.value)}
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="skills-libraries">Libraries</label>
                <input
                    id="skills-libraries"
                    type="text"
                    placeholder="pandas, NumPy, Matplotlib"
                    value={skillsData.libraries}
                    onChange={(e) => handleSkillsChange("libraries", e.target.value)}
                />
            </div>
        </form>
    )
}
