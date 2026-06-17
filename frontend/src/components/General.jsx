export default function General({ formData, handleGeneralChange }) {
    return (
        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
                <label className="field-label" htmlFor="general-name">Full name</label>
                <input
                    id="general-name"
                    type="text"
                    placeholder="Jordan Lee"
                    value={formData.name}
                    onChange={(e) => handleGeneralChange("name", e.target.value)}
                    required
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="general-email">Email</label>
                <input
                    id="general-email"
                    type="email"
                    placeholder="jordan@email.com"
                    value={formData.email}
                    onChange={(e) => handleGeneralChange("email", e.target.value)}
                    required
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="general-number">Phone number</label>
                <input
                    id="general-number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.number}
                    onChange={(e) => handleGeneralChange("number", e.target.value)}
                    required
                />
            </div>

            <div className="field">
                <label className="field-label" htmlFor="general-location">Location</label>
                <input
                    id="general-location"
                    type="text"
                    placeholder="Austin, TX"
                    value={formData.location}
                    onChange={(e) => handleGeneralChange("location", e.target.value)}
                    required
                />
            </div>
        </form>
    )
}
