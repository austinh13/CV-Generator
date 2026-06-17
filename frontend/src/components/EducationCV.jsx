import { GraduationCap, Trash } from "@phosphor-icons/react";

export default function EducationCV({ sections, setSections }) {

    const formatDateUS = (dateString) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${month}/${day}/${year}`;
    };

    const handleDelete = (indexToDelete) => {
        setSections(prevSections =>
            prevSections.filter((_, index) => index !== indexToDelete)
        );
    };

    return (
        <div className="resume-section">
            <h2 className="resume-section-title">
                <GraduationCap size={18} weight="bold" />
                Education
            </h2>

            {sections.length === 0 ? (
                <div className="resume-empty">
                    <GraduationCap size={28} weight="light" />
                    <p>Your education will show up here once you add a school on the left.</p>
                </div>
            ) : (
                <div className="resume-list">
                    {sections.map((sec, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-main">
                                <p className="resume-item-title">{sec.school}{sec.city ? `, ${sec.city}` : ""}</p>
                                <p className="resume-item-sub">{sec.degree}{sec.gpa ? ` · GPA ${sec.gpa}` : ""}</p>
                                <p className="resume-item-meta">{formatDateUS(sec.sDate)} – {formatDateUS(sec.eDate)}</p>
                            </div>
                            <button
                                type="button"
                                className="resume-item-delete"
                                aria-label={`Remove ${sec.school}`}
                                onClick={() => handleDelete(index)}
                            >
                                <Trash size={15} weight="bold" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
