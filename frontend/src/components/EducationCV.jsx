import { Trash } from "@phosphor-icons/react";
import { formatDateUS } from "../utils/formatDate";

export default function EducationCV({ sections, setSections }) {

    const handleDelete = (indexToDelete) => {
        setSections(prevSections =>
            prevSections.filter((_, index) => index !== indexToDelete)
        );
    };

    return (
        <div className="resume-section">
            <h2 className="resume-section-title">Education</h2>

            {sections.length === 0 ? (
                <p className="resume-empty-line">Add a school on the left to see it appear here.</p>
            ) : (
                <div className="resume-entries">
                    {sections.map((sec, index) => (
                        <div key={index} className="resume-entry">
                            <div className="resume-row">
                                <span className="resume-row-left resume-strong">{sec.school}</span>
                                <span className="resume-row-right">{sec.city}</span>
                            </div>
                            <div className="resume-row">
                                <span className="resume-row-left resume-em">
                                    {sec.degree}{sec.gpa ? ` (GPA: ${sec.gpa})` : ""}
                                </span>
                                <span className="resume-row-right resume-em">
                                    {formatDateUS(sec.sDate)} &ndash; {formatDateUS(sec.eDate)}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="resume-item-delete"
                                aria-label={`Remove ${sec.school}`}
                                onClick={() => handleDelete(index)}
                            >
                                <Trash size={13} weight="bold" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
